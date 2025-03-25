import type { Filter } from "../types/filter-types";
import "./filter-pane.scss"
import SortingFilter from "./filters/sorting-filter";

export default function FilterPane({ filter, apply, change }: {
    filter: Filter,
    apply: () => void,
    change: (newFilter: Filter) => void
}) {

    const onSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const changedSort = e.currentTarget.value;
        console.log("Sorting method changed to: ", changedSort);
        const tmpFilter = { ...filter, sort: changedSort };
        change(tmpFilter);
    }

    return (
        <aside className="filter-container">
            <form className="filter-form">
                <SortingFilter selectedSorting={filter.sort} handler={onSortChange} />
                <input type="submit" className="btnSetFilters" value="Apply filters" onClick={(e) => { e.preventDefault(); apply() }} />
            </form>
        </aside>
    )
}