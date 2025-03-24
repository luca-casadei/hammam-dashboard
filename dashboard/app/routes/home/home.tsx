import { useEffect, useState } from "react";
import type { Route } from "../+types/home";
import ReadingsContainer from "./dashboard/readings-container";
import "./home.scss"
import type { FullReading, MetaReading } from "~/types/readings";
import HTTPClient from "~/client/HTTPClient";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Readings Dashboard" },
    { name: "description", content: "Welcome to the temperatures and humidity readings dashboard" },
  ];
}

export default function Home() {
  const [readings, setReadings] = useState<readonly FullReading[]>([]);
  useEffect(() => {
    getReadings()
  }, []);

  async function getReadings(): Promise<void> {
    const client: HTTPClient = new HTTPClient();
    const meta: MetaReading = await client.getReadings();
    console.log(meta)
    setReadings(meta.data)
  }

  return (
    <main>
      <ReadingsContainer readings={readings} />
    </main>
  )
}
