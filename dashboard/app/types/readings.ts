export type GenericReading = {
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

export type FullReading = GenericReading & ReadingWithStats