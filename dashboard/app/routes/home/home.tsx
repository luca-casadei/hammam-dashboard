import { createContext, useContext, useEffect, useState } from "react";
import type { Route } from "../+types/home";
import ReadingsContainer from "./dashboard/readings-container";
import "./home.scss"
import type { MetaReading } from "~/types/readings";
import HTTPClient from "~/client/HTTPClient";
import FilterPane from "./filters/filter-pane";
import HTTPQueryBuilder from "~/client/query-builder/interface/HTTPQueryBuilder";
import type { Filter } from "./types/filter-types";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Readings Dashboard" },
    { name: "description", content: "Welcome to the temperatures and humidity readings dashboard" },
  ];
}

export default function Home() {
  const [readings, setReadings] = useState<MetaReading>({ data: [], meta: [{ totalCount: 0 }] });
  const [filter, setFilter] = useState<Filter>({ sort: "unsorted" });
  const client: HTTPClient = new HTTPClient();
  const queryBuilder: HTTPQueryBuilder = new HTTPQueryBuilder();

  useEffect(() => {
    console.log("Initializing dashboard components...");
    manageSubmit();
  }, []);

  const manageSubmit = async () => {

    if (filter.sort !== "unsorted") {
      queryBuilder.addSorting(filter.sort === "asc");
    }
    const meta: MetaReading = await client.getReadings(queryBuilder.build());
    setReadings(meta);
  }

  const manageChange = (newFilter: Filter) => {
    setFilter(newFilter);
  }

  return (
    <main>
      <ReadingsContainer readings={readings} />
      <FilterPane filter={filter} change={manageChange} apply={manageSubmit} />
    </main>
  )
}
