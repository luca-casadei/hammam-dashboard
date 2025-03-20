import z from "zod"

type GenericReading = {
    reading: number,
    sender: string
}

type ReadingWithStats = {
    readingDateTime: Date
    inThreshold: boolean
    deviation: number
    score: number
    inScoreTreshold: boolean
    type: string
}

export type FullReading = ReadingWithStats & GenericReading

export const SCHEMAS = {
    paginationGetSchema : z.object({
        page: z.optional(z.number()),
        limit: z.optional(z.number()),
        type: z.optional(z.string()),
        ascending: z.optional((z.preprocess((value) => {
            const lowerValue = (value as string).toLowerCase()
            if(lowerValue === "true"){
                return true
            }
            if(lowerValue === "false"){
                return false
            }
            return ""
        }, z.boolean()))),
        from: z.optional(z.coerce.date(z.string().datetime())),
        to: z.optional(z.coerce.date(z.string().datetime()))
    })
}

export type FullGetSchema = z.infer<typeof SCHEMAS.paginationGetSchema>