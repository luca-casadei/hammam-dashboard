import { MongoClient } from "mongodb";
import Repository, { collectionConfiguration } from "./repository";
import { FullHumidityReading } from "../validator/schemas/schemas";
import GenericRepo from "./interfaces/abstract-repo";

export default class HumidityRepo extends GenericRepo{
    public constructor(){
        super("humidities")
    }
    async add(reading: FullHumidityReading): Promise<void> {
        const client: MongoClient = Repository.getInstance().getClient();
        await client.db().collection(this.getName()).insertOne(reading);
    }
}