import GenericRepo from "./interfaces/abstract-repo";

export default class HumidityRepo extends GenericRepo {
    public constructor() {
        super("humidities")
    }
}