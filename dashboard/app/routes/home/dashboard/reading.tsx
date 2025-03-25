import type { FullReading } from "~/types/readings";
import "./scss/readings.scss"

export default function Reading({reading}: {reading: FullReading}) {
    return (
        <li className="reading">
            <p className="reading-part reading-part-single">{reading.sender}</p>
            <p className="reading-part reading-part-single">{reading.reading}</p>
            <p className="reading-part reading-part-double">{reading.readingDateTime.toString()}</p>
            <p className={reading.inThreshold ? "reading-part reading-part-single" : "reading-part reading-part-single warning"}>{reading.inThreshold.toString()}</p>
            <p className="reading-part reading-part-single">{reading.deviation.toFixed(6)}</p>
            <p className="reading-part reading-part-single">{reading.score.toFixed(6)}</p>
            <p className={reading.inScoreTreshold ? "reading-part reading-part-single" : "reading-part reading-part-single warning"}>{reading.inScoreTreshold.toString()}</p>
            <p className="reading-part reading-part-single">{reading.type}</p>
        </li>
    )
}