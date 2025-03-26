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
  const [filter, setFilter] = useState<Filter>({ sort: "unsorted", page: 1, limit: 10 });
  const client: HTTPClient = new HTTPClient();
  const queryBuilder: HTTPQueryBuilder = new HTTPQueryBuilder();
  const [oldPage, setOldPage] = useState<number>(1);

  useEffect(() => {
    console.log("Initializing dashboard components...");
    manageSubmit();
  }, []);

  const manageSubmit = async () => {
    if (filter.sort !== "unsorted") {
      queryBuilder.addSorting(filter.sort === "asc");
    }
    queryBuilder.addPagination(filter.page, filter.limit);
    const meta: MetaReading = await client.getReadings(queryBuilder.build());
    setReadings(meta);
    setOldPage(filter.page);
  }

  const manageChange = (newFilter: Filter) => {
    setFilter(newFilter);
  }

  return (
    <main>
      <ReadingsContainer readings={readings} />
      <FilterPane readingNo={readings.meta[0].totalCount} filter={filter} oldPage={oldPage} change={manageChange} apply={manageSubmit} />
    </main>
  )
}
