import HumidityRepo from "../repository/humidity-repo";
import { FullReading, HumidityReading } from "../validator/schemas/schemas";
import { HUMIDITY_TRESHOLDS, SCORE_TRESH } from "./tresholds";

export default class HumidityController {

    private readonly repo: HumidityRepo;

    constructor() {
        this.repo = new HumidityRepo();
        this.repo.init();
    }

    public async receive(reading: HumidityReading): Promise<void> {
        const deviation: number = await this.repo.getStandardDeviation();
        const average: number = await this.repo.getAverage();
        const score: number = deviation === 0 ? (0.0) : ((reading.humidity - average) / deviation);
        const fullReading: FullReading = {
            reading: reading.humidity,
            sender: reading.sender,
            inThreshold: false,
            readingDateTime: new Date(),
            deviation: deviation,
            score: score,
            inScoreTreshold: (score < SCORE_TRESH && score > -SCORE_TRESH)
        }
        if (this.inSafeRange(reading.humidity)) {
            fullReading.inThreshold = true;
        }
        this.repo.add(fullReading)
    }

    private inSafeRange(temperatureReading: number): boolean {
        return (temperatureReading < HUMIDITY_TRESHOLDS.max && temperatureReading > HUMIDITY_TRESHOLDS.min);
    }
}