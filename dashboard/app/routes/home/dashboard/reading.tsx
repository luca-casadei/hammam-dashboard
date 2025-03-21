import type { FullReading } from "~/types/readings";

export default function Reading({reading}: {reading: FullReading}) {
    return (
        <li>
            <div>{reading.sender}</div>
            <div>{reading.reading}</div>
            <div>{reading.readingDateTime.toString()}</div>
            <div>{reading.inThreshold.toString()}</div>
            <div>{reading.deviation}</div>
            <div>{reading.score}</div>
            <div>{reading.inScoreTreshold.toString()}</div>
            <div>{reading.type}</div>
        </li>
    )
}