import { MongoClient } from "mongodb";
import Repository from "./repository";
import { FullTemperatureReading } from "../validator/schemas/schemas";
import GenericRepo from "./interfaces/abstract-repo";

export default class TemperatureRepo extends GenericRepo {
    constructor(){
        super("temperatures")
    }
    async add(reading: FullTemperatureReading): Promise<void> {
        const client: MongoClient = Repository.getInstance().getClient();
        await client.db().collection(this.getName()).insertOne(reading); 
    }
}