import { LineChart } from "@mui/x-charts";
import type { FullReading, MetaReading } from "~/types/readings";
import "./linearview.scss"

export default function LinearView({ readings }: { readings: MetaReading }) {
    const readableTempData = readings.data.filter((reading: FullReading) => reading.type === "temperature");
    const readableHumData = readings.data.filter((reading: FullReading) => reading.type === "humidity");
    return (
        <section className="lvw-container">
            <h1>Linear views</h1>
            <LineChart
                xAxis={[{
                    data: readableTempData.map((reading: FullReading) => new Date(reading.readingDateTime)),
                    label: "Time",
                    scaleType: "utc",
                    tickMinStep: 2000
                }]}
                series={[
                    {
                        data: readableTempData.map((reading: FullReading) => reading.reading),
                        label: "Temperature (C°)",
                        showMark: false
                    }
                ]}
                height={400}
            />
            <LineChart
                xAxis={[{
                    data: readableHumData.map((reading: FullReading) => new Date(reading.readingDateTime)),
                    label: "Time",
                    scaleType: "time",
                    tickMinStep: 2000
                }]}
                series={[
                    {
                        data: readableHumData.map((reading: FullReading) => reading.reading),
                        label: "Humidity (%)",
                        showMark: false
                    }
                ]}
                height={400}
            />
        </section>
    )
}