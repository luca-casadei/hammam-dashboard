import { MongoClient } from "mongodb";

export default class DbConnector {
    private readonly client: MongoClient;
    private static instance: DbConnector;

    private static readonly connectionString: string = "mongodb://"
        + process.env.MONGO_READ_USER!
        + ":" + process.env.MONGO_READ_PASSWORD!
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