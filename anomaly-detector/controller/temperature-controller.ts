import TemperatureRepo from "../repository/temperature-repo";
import { FullReading, TemperatureReading } from "../validator/schemas/schemas";
import { SCORE_TRESH, TEMPERATURE_TRESHOLDS } from "./tresholds";

export default class TemperatureController {

    private readonly repo: TemperatureRepo;

    constructor() {
        this.repo = new TemperatureRepo();
        this.repo.init();
    }

    public async receive(reading: TemperatureReading): Promise<void> {
        const deviation: number = await this.repo.getStandardDeviation();
        const average: number = await this.repo.getAverage();
        const score: number = deviation === 0 ? (0.0) : ((reading.temperature - average) / deviation);
        const fullReading: FullReading = {
            reading: reading.temperature,
            sender: reading.sender,
            inThreshold: false,
            readingDateTime: new Date(),
            deviation: deviation,
            score: score,
            inScoreTreshold: (score < SCORE_TRESH && score > -SCORE_TRESH)
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