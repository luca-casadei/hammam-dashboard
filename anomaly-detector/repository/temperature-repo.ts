import GenericRepo from "./interfaces/abstract-repo";

export default class TemperatureRepo extends GenericRepo {
    constructor() {
        super("temperatures")
    }
}