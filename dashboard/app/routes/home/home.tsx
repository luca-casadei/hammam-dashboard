import { useEffect, useState } from "react";
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
  const defaultMeta : MetaReading = { data: [], meta: [{ totalCount: 0 }] };
  const [readings, setReadings] = useState<MetaReading>(defaultMeta);
  const client: HTTPClient = new HTTPClient();
  const queryBuilder: HTTPQueryBuilder = new HTTPQueryBuilder();
  const [oldPage, setOldPage] = useState<number>(1);
  const [filter, setFilter] = useState<Filter>({ sort: "unsorted", page: 1, limit: 50, type: "all" });

  useEffect(() => {
    console.log("Initializing dashboard components...");
    manageSubmit();
  }, []);

  const manageSubmit = async () => {
    if (filter.sort !== "unsorted") {
      queryBuilder.addSorting(filter.sort === "asc");
    }
    if (filter.dateFrom) {
      queryBuilder.addTimeFrom(filter.dateFrom);
    }
    if (filter.dateTo) {
      queryBuilder.addTimeTo(filter.dateTo);
    }
    if (filter.type !== "all") {
      queryBuilder.addType(filter.type);
    }
    queryBuilder.addPagination(filter.page, filter.limit);
    let meta: MetaReading = await client.getReadings(queryBuilder.build());
    if (meta.meta[0] === undefined) {
      meta = defaultMeta;
    }
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
