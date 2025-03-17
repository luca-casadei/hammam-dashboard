import { MongoClient } from "mongodb";

export default class Repository {
    private readonly client: MongoClient;
    private constructor(connectionString: string) {
        this.client = new MongoClient(connectionString);
    }
    private static instance: Repository;
    public getInstance(connectionString: string): Repository {
        if (Repository.instance == undefined) {
            Repository.instance = new Repository(connectionString);
        }
        return Repository.instance;
    }
    public getClient(): MongoClient{
        return this.getClient();
    }
}