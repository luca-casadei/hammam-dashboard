import type { FullReading, MetaReading } from "~/types/readings";
import Reading from "./reading";
import "./scss/readings-container.scss"

export default function ReadingsContainer({ readings }: { readings: MetaReading }) {
    return (
        <ul className="readings-container">
            {readings.data.map(reading => (
                <Reading reading={reading} key={reading._id} />
            ))}
        </ul>
    );
}