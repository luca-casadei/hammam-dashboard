import "./scss/sorting-filter.scss"

export default function SortingFilter({ handler, selectedSorting }: { handler: (sort: string) => void, selectedSorting: string }) {
    return (
        <fieldset className="sort-set">
            <legend>Sorting method:</legend>
            <div>
                <label htmlFor="ascending">Ascending:</label>
                <input checked={selectedSorting === "asc"} type="radio" name="sortmethod" value={"asc"} id="ascending" onChange={e => handler(e.target.value)} />
            </div>
            <div>
                <label htmlFor="descending">Descending:</label>
                <input checked={selectedSorting === "desc"} type="radio" name="sortmethod" value={"desc"} id="descending" onChange={e => handler(e.target.value)} />
            </div>
            <div>
                <label htmlFor="unsorted">Unsorted:</label>
                <input checked={selectedSorting === "unsorted"} type="radio" name="sortmethod" value={"unsorted"} id="unsorted" onChange={e => handler(e.target.value)} />
            </div>
        </fieldset>
    )
}