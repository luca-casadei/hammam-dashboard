import "./sorting-filter.scss"

export default function SortingFilter({ handler, selectedSorting }: { handler : (e: React.ChangeEvent<HTMLInputElement>) => void, selectedSorting: string }) {
    return (
        <fieldset>
            <legend>Sorting method:</legend>
            <div>
                <label htmlFor="ascending">Ascending:</label>
                <input checked={selectedSorting === "asc"} type="radio" name="sortmethod" value={"asc"} id="ascending" onChange={handler} />
            </div>
            <div>
                <label htmlFor="descending">Descending:</label>
                <input checked={selectedSorting === "desc"} type="radio" name="sortmethod" value={"desc"} id="descending" onChange={handler} />
            </div>
            <div>
                <label htmlFor="unsorted">Unsorted:</label>
                <input checked={selectedSorting === "unsorted"} type="radio" name="sortmethod" value={"unsorted"} id="unsorted" onChange={handler} />
            </div>
        </fieldset>
    )
}