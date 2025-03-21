import type { FullReading } from "~/types/readings";
import Reading from "./reading";

export default function ReadingsContainer({readings}: {readings: readonly FullReading[]}) {
    return (
        <ul>
            {readings.map(reading => (
                <Reading reading={reading} key={reading. + reading.readingDateTime.toString()} />
            ))}
        </ul>
    );
}