import dotenv from "dotenv"
dotenv.config();

export const TEMPERATURE_TRESHOLDS = {
    min: parseFloat(process.env.TEMPERATURE_MIN!),
    max: parseFloat(process.env.TEMPERATURE_MAX!)
}

export const HUMIDITY_TRESHOLDS = {
    min: parseFloat(process.env.HUMIDITY_MIN!),
    max: parseFloat(process.env.HUMIDITY_MAX!)
}