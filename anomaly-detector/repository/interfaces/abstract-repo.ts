import { MongoClient, Document } from "mongodb";
import Repo from "./repo";
import DbConnector, { collectionConfiguration } from "../connector";
import { FullReading } from "../../validator/schemas/schemas";

export default class GenericRepo implements Repo {
    private readonly collectionName: string
    public constructor() {
        this.collectionName = "readings"
    }

    public async add(reading: FullReading): Promise<void> {
        const client: MongoClient = DbConnector.getInstance().getClient();
        await client.db().collection(this.getName()).insertOne(reading);
    }

    public async init(): Promise<void> {
        const client: MongoClient = DbConnector.getInstance().getClient();
        if (!((await (client.db().listCollections().map(c => c.name).toArray())).includes(this.collectionName))) {
            await client.db().createCollection(this.collectionName, {
                timeseries: collectionConfiguration.timeSeriesConfig,
                expireAfterSeconds: collectionConfiguration.expirationConfig.seconds
            })
        }
    }

    public async getAverage(type: string): Promise<number> {
        const client: MongoClient = DbConnector.getInstance().getClient();
        const pipeline: Document[] = [
            { $match: { type: type } },
            { $group: { _id: 1, avg: { $avg: '$reading' } } }
        ]
        const aggregation = client.db().collection(this.getName()).aggregate(pipeline)
        let average: number = 0.0;
        if (await aggregation.hasNext()) {
            const aggregate: { _id: number, avg: number } = await aggregation.next() as { _id: number, avg: number };
            average = aggregate.avg;
        }
        return average
    }


    public async getStandardDeviation(type: string): Promise<number> {
        const client: MongoClient = DbConnector.getInstance().getClient();
        const pipeline: Document[] = [
            { $match: { type: type } },
            { $group: { _id: 1, stdDev: { $stdDevPop: '$reading' } } }
        ]
        const aggregation = client.db().collection(this.getName()).aggregate(pipeline)
        let deviation: number = 0.0;
        if (await aggregation.hasNext()) {
            const aggregate: { _id: number, stdDev: number } = await aggregation.next() as { _id: number, stdDev: number };
            deviation = aggregate.stdDev;
        }
        return deviation
    }

    protected getName(): string {
        return this.collectionName;
    }
}