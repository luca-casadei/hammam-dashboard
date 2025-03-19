import { MongoClient, Document } from "mongodb";
import Repo from "./repo";
import Repository, { collectionConfiguration } from "../repository";
import { FullReading } from "../../validator/schemas/schemas";

export default abstract class GenericRepo implements Repo {
    private readonly collectionName: string

    protected constructor(name: string) {
        this.collectionName = name;
    }

    public async add(reading: FullReading): Promise<void> {
        const client: MongoClient = Repository.getInstance().getClient();
        await client.db().collection(this.getName()).insertOne(reading);
    }

    public async init(): Promise<void> {
        const client: MongoClient = Repository.getInstance().getClient();
        if (!((await (client.db().listCollections().map(c => c.name).toArray())).includes(this.collectionName))) {
            await client.db().createCollection(this.collectionName, {
                timeseries: collectionConfiguration.timeSeriesConfig,
                expireAfterSeconds: collectionConfiguration.expirationConfig.seconds
            })
        }
    }

    public async getAverage(): Promise<number> {
        const client: MongoClient = Repository.getInstance().getClient();
        const pipeline: Document[] = [{ $group: { _id: 1, avg: { $avg: '$reading' } } }]
        const aggregation = client.db().collection(this.getName()).aggregate(pipeline)
        let average: number = 0.0;
        if (await aggregation.hasNext()) {
            const aggregate: { _id: number, avg: number } = await aggregation.next() as { _id: number, avg: number };
            average = aggregate.avg;
        }
        return average
    }


    public async getStandardDeviation(): Promise<number> {
        const client: MongoClient = Repository.getInstance().getClient();
        const pipeline: Document[] = [{ $group: { _id: 1, stdDev: { $stdDevPop: '$reading' } } }]
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