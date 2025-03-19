import dotenv from "dotenv"
dotenv.config();

export type Treshold = {
    min: number,
    max: number
}

export default class TresholdProvider {

    private static readonly TEMPERATURE_TRESHOLDS = {
        min: parseFloat(process.env.TEMPERATURE_MIN!),
        max: parseFloat(process.env.TEMPERATURE_MAX!)
    }

    private static readonly HUMIDITY_TRESHOLDS = {
        min: parseFloat(process.env.HUMIDITY_MIN!),
        max: parseFloat(process.env.HUMIDITY_MAX!)
    }

    private static readonly SCORE_TRESH: number = parseInt(process.env.SCORE_TRESH!)


    public static get(type: string): Treshold {
        switch (type) {
            case "humidity": {
                return TresholdProvider.HUMIDITY_TRESHOLDS
            }
            case "temperature": {
                return TresholdProvider.TEMPERATURE_TRESHOLDS
            }
            default: {
                throw Error("Illegal type provider")
            }
        }
    }

    public static getForScore(): number {
        return this.SCORE_TRESH;
    }
}