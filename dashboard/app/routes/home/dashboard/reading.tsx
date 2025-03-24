import type { FullReading } from "~/types/readings";
import "./scss/readings.scss"

export default function Reading({reading}: {reading: FullReading}) {
    return (
        <li className="reading">
            <p className="bg-red">{reading.sender}</p>
            <p>{reading.reading}</p>
            <p>{reading.readingDateTime.toString()}</p>
            <p>{reading.inThreshold.toString()}</p>
            <p>{reading.deviation}</p>
            <p>{reading.score}</p>
            <p>{reading.inScoreTreshold.toString()}</p>
            <p>{reading.type}</p>
        </li>
    )
}