import HumidityRepo from "../repository/humidity-repo";
import { FullHumidityReading, HumidityReading } from "../validator/schemas/schemas";
import { HUMIDITY_TRESHOLDS } from "./tresholds";

export default class HumidityController {

    private readonly repo: HumidityRepo;

    constructor() {
        this.repo = new HumidityRepo();
        this.repo.init();
    }

    public receive(reading: HumidityReading): void {
        const fullReading: FullHumidityReading = { humidity: reading.humidity, sender: reading.sender, inThreshold: false, readingDateTime: new Date() }
        if (this.inSafeRange(reading.humidity)) {
            fullReading.inThreshold = true;
        }
        this.repo.add(fullReading)
    }

    private inSafeRange(temperatureReading: number): boolean {
        return (temperatureReading < HUMIDITY_TRESHOLDS.max && temperatureReading > HUMIDITY_TRESHOLDS.min);
    }
}