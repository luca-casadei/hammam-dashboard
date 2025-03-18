import z from "zod";

export const TEMPERATURE_SCHEMAS = {
    postedTemperatureSchema : z.object({
        temperature: z.coerce.number(),
        sender: z.string()
    })
}

export const HUMIDITY_SCHEMAS = {
    postedHumiditySchema: z.object({
        humidity: z.coerce.number(),
        sender: z.string()
    })
}

type ReadingWithDateTime = {
    readingDateTime: Date
    inThreshold: boolean
}

export type TemperatureReading = z.infer<typeof TEMPERATURE_SCHEMAS.postedTemperatureSchema>
export type HumidityReading = z.infer<typeof HUMIDITY_SCHEMAS.postedHumiditySchema>
export type FullTemperatureReading = TemperatureReading & ReadingWithDateTime
export type FullHumidityReading = HumidityReading & ReadingWithDateTime