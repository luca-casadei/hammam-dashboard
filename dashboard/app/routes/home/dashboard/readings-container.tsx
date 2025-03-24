import type { FullReading } from "~/types/readings";
import Reading from "./reading";
import "./scss/readings-container.scss"

export default function ReadingsContainer({ readings }: { readings: readonly FullReading[] }) {
    return (
        <ul className="readings-container">
            {readings.map(reading => (
                <Reading reading={reading} key={reading.readingDateTime + "//" + reading.type} />
            ))}
        </ul>
    );
}