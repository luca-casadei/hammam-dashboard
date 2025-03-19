import GenericRepo from "./interfaces/abstract-repo";
import Repository from "./repository";

export default class HumidityRepository extends GenericRepo{
    public async getEveryReading(){
        const client = Repository.getInstance().getClient();
        const results = client.db().collection(this.getName()).find()
        for await (const result of results){
            
        }
    }
}