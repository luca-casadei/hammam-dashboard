import { MongoClient } from "mongodb";

export default class Repository {
    private readonly client: MongoClient;
    private static instance: Repository;

    private static connectionString: string = "mongodb://"
        + process.env.MONGO_READ_USER!
        + ":" + process.env.MONGO_READ_PASSWORD!
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