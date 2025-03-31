import { useEffect, useState } from "react";
import type { MetaReading } from "~/types/readings";
import type { Route } from "../+types/home";
import LinearView from "./normaldist/linearview";
import HTTPClient from "~/client/HTTPClient";
import HTTPQueryBuilder from "~/client/query-builder/interface/HTTPQueryBuilder";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Readings Graphs" },
    { name: "description", content: "Here you can view some graphs of the read values." },
  ];
}

export default function Graphs() {
  const [readings, setReadings] = useState<MetaReading>({ data: [], meta: [{ totalCount: 0 }] });
  useEffect(() => {
    console.log("Initializing graph components...");
    getReadings()
  }, []);

  const getReadings = async () => {
    const queryBuilder: HTTPQueryBuilder =  new HTTPQueryBuilder();
    queryBuilder.addSorting(false);
    queryBuilder.addPagination(1, 500)
    const meta: MetaReading = await new HTTPClient("localhost", 8000).getReadings(queryBuilder.build());
    setReadings(meta);
  }

  return (
    <main>
      <LinearView readings={readings} />
    </main>
  );
}