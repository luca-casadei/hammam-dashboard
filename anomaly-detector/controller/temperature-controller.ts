import TemperatureRepo from "../repository/temperature-repo";
import { FullTemperatureReading, TemperatureReading } from "../validator/schemas/schemas";
import { TEMPERATURE_TRESHOLDS } from "./tresholds";

export default class TemperatureController {

    private readonly repo: TemperatureRepo;

    constructor() {
        this.repo = new TemperatureRepo();
        this.repo.init();
    }

    public receive(reading: TemperatureReading): void {
        const fullReading: FullTemperatureReading = {
            temperature: reading.temperature,
            sender: reading.sender,
            inThreshold: false,
            readingDateTime: new Date()
        }
        if (this.inSafeRange(reading.temperature)) {
            fullReading.inThreshold = true;
        }
        this.repo.add(fullReading)
    }

    private inSafeRange(temperatureReading: number): boolean {
        return (temperatureReading < TEMPERATURE_TRESHOLDS.max && temperatureReading > TEMPERATURE_TRESHOLDS.min);
    }
}