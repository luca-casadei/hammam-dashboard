import GenericRepo from "../repository/interfaces/abstract-repo";
import { FullReading, GenericReading } from "../validator/schemas/schemas";
import TresholdProvider, { Treshold } from "./tresholds";

export default class Controller {

    private readonly repo: GenericRepo;
    private readonly type: string;

    constructor(type: string) {
        this.repo = new GenericRepo();
        this.type = type
        this.repo.init();
    }

    public async receive(reading: GenericReading): Promise<void> {
        const deviation: number = await this.repo.getStandardDeviation(this.type);
        const average: number = await this.repo.getAverage(this.type);
        const score: number = deviation === 0 ? (0.0) : ((reading.reading - average) / deviation);
        const fullReading: FullReading = {
            reading: reading.reading,
            sender: reading.sender,
            type: this.type,
            inThreshold: false,
            readingDateTime: new Date(),
            deviation: deviation,
            score: score,
            inScoreTreshold: (score < TresholdProvider.getForScore() && score > -TresholdProvider.getForScore())
        }
        if (this.inSafeRange(reading.reading, this.type)) {
            fullReading.inThreshold = true;
        }
        this.repo.add(fullReading)
    }

    private inSafeRange(temperatureReading: number, type: string): boolean {
        const tresh: Treshold = TresholdProvider.get(type);
        return (temperatureReading < tresh.max && temperatureReading > tresh.min);
    }
}