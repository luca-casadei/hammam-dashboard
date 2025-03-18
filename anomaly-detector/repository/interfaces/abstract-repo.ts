import { MongoClient } from "mongodb";
import Repo from "./repo";
import Repository, { collectionConfiguration } from "../repository";

export default abstract class GenericRepo implements Repo {
    private readonly collectionName: string
    protected constructor(name: string) {
        this.collectionName = name;
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
    protected getName(): string{
        return this.collectionName;
    }
}