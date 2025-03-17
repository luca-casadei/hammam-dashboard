import z from "zod";

export const TEMPERATURE_SCHEMAS = {
    postedTemperatureSchema : z.object({
        temperature: z.coerce.number()
    })
}

export const HUMIDITY_SCHEMAS = {
    postedHumiditySchema: z.object({
        humidity: z.coerce.number()
    })
}