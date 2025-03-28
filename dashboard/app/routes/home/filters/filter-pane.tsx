import { useState } from "react";
import type { Filter } from "../types/filter-types";
import "./filter-pane.scss"
import DateSelector from "./filters/date-selector";
import PageSelector from "./filters/page-selector";
import SortingFilter from "./filters/sorting-filter";

export default function FilterPane({ filter, apply, change, readingNo, oldPage }: {
    filter: Filter,
    apply: () => void,
    change: (newFilter: Filter) => void,
    readingNo: number,
    oldPage: number
}) {

    const onSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const changedSort = e.currentTarget.value;
        console.log("Sorting method changed to: ", changedSort);
        const tmpFilter: Filter = { ...filter, sort: changedSort };
        change(tmpFilter);
    }

    const onPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const changedPage = parseInt(e.currentTarget.value)
        console.log("Page changed to: ", changedPage);
        const tmpFilter: Filter = { ...filter, page: changedPage };
        change(tmpFilter);
    }

    return (
        <aside className="filter-container">
            <form className="filter-form">
                <div className="form-row">
                    <SortingFilter selectedSorting={filter.sort} handler={onSortChange} />
                    <PageSelector readNo={readingNo} currentPage={oldPage} handler={onPageChange} currentLimit={filter.limit} />
                </div>
                <div className="form-row">
                    <DateSelector />
                </div>
                <input type="submit" className="btnSetFilters" value="Apply filters" onClick={(e) => {
                    e.preventDefault();
                    let newFromDate : string | undefined = undefined;
                    let newToDate: string | undefined = undefined;
                    /*
                    if (fromDateValue){
                        newFromDate = fromDateValue;
                        if (fromTimeValue){
                            newFromDate += "T" + fromTimeValue;
                        }
                    }
                    if (toDateValue){
                        newToDate = toDateValue;
                        if (toTimeValue){
                            newToDate += "T" + toTimeValue + "Z";
                        }
                    }
                    console.log(fromDateValue, toDateValue, fromTimeValue, toTimeValue, newFromDate, newToDate)*/
                    change({ ...filter, dateFrom: newFromDate ? new Date(newFromDate) : undefined, dateTo: newToDate ? new Date(newToDate) : undefined });
                    apply()
                }} />
            </form>
        </aside>
    )
}