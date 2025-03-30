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

export default class DbConnector {
    private readonly client: MongoClient;
    private static instance: DbConnector;

    private static readonly connectionString: string = "mongodb://"
        + process.env.MONGO_USER!
        + ":" + process.env.MONGO_PASSWORD!
        + "@database:" + process.env.MONGODB_PORT! + "/" + process.env.MONGO_INITDB_DATABASE!;

    private constructor() {
        this.client = new MongoClient(DbConnector.connectionString);
    }
    public static getInstance(): DbConnector {
        if (DbConnector.instance == undefined) {
            DbConnector.instance = new DbConnector();
        }
        return DbConnector.instance;
    }
    public getClient(): MongoClient {
        return this.client;
    }
}