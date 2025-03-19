import { MongoClient } from "mongodb";
import dotenv from "dotenv"
dotenv.config()

export const collectionConfiguration = {
    timeSeriesConfig: {
        timeField: "readingDateTime",
        metaField: "sender",
        granularity: "seconds"
    },
    expirationConfig: {
        seconds: parseInt(process.env.MONGO_EXP_TIME_SEC!)
    }
}

export default class Repository {
    private readonly client: MongoClient;
    private static instance: Repository;

    private static connectionString: string = "mongodb://"
        + process.env.MONGO_USER!
        + ":" + process.env.MONGO_PASSWORD!
        + "@database:" + process.env.MONGODB_PORT! + "/" + process.env.MONGO_INITDB_DATABASE!;

    private constructor() {
        this.client = new MongoClient(Repository.connectionString);
    }
    public static getInstance(): Repository {
        if (Repository.instance == undefined) {
            Repository.instance = new Repository();
        }
        return Repository.instance;
    }
    public getClient(): MongoClient {
        return this.client;
    }
}