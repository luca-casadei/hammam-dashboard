import { useState } from "react";
import type { Filter } from "../types/filter-types";
import "./filter-pane.scss"
import DateSelector from "./filters/date-selector";
import PageSelector from "./filters/page-selector";
import SortingFilter from "./filters/sorting-filter";
import TypeSelector from "./filters/type-selector";

export default function FilterPane({ filter, apply, change, readingNo, oldPage }: {
    filter: Filter,
    apply: () => void,
    change: (newFilter: Filter) => void,
    readingNo: number,
    oldPage: number
}) {

    const onSortChange = (changedSort: string) => {
        const tmpFilter: Filter = { ...filter, sort: changedSort };
        change(tmpFilter);
    }

    const onPageChange = (newPage: number) => {
        const tmpFilter: Filter = { ...filter, page: newPage };
        change(tmpFilter);
    }

    const selectType = (type: string) => {
        const tmpFilter: Filter = { ...filter, type: type };
        change(tmpFilter);
    }

    const selectFromDate = (fromDate: string) => {
        const tmpFilter: Filter = { ...filter, dateFrom: new Date(fromDate) };
        change(tmpFilter);
    }

    const selectToDate = (toDate: string) => {
        const tmpFilter: Filter = { ...filter, dateTo: new Date(toDate) };
        change(tmpFilter);
    }

    return (
        <aside className="filter-container">
            <form className="filter-form">
                <TypeSelector type={filter.type} selectType={selectType} />
                <div className="form-row">
                    <SortingFilter selectedSorting={filter.sort} handler={onSortChange} />
                    <PageSelector readNo={readingNo} currentPage={oldPage} handler={onPageChange} currentLimit={filter.limit} />
                </div>
                <div className="form-row">
                    <DateSelector fromHandler={selectFromDate} toHandler={selectToDate} />
                </div>
                <input type="submit" className="btnSetFilters" value="Apply filters" onClick={(e) => {
                    e.preventDefault();
                    console.log(filter.dateFrom?.toISOString(), filter.dateTo?.toISOString())
                    apply()
                }} />
            </form>
        </aside>
    )
}