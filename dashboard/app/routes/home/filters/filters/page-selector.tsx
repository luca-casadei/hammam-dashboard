import "./page-selector.scss"

export default function PageSelector({ currentPage, currentLimit, readNo, handler }: { currentPage: number, currentLimit: number, readNo: number, handler: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    const currentPageLimit: number = parseInt((readNo / currentLimit).toFixed(0))
    return (
        <fieldset className="page-selector">
            <legend>Page selector</legend>
            <p>Page {currentPage} out of {currentPageLimit}</p>
            <p>{readNo} total readings</p>
            <label htmlFor="page">Go to page:</label>
            <input type="number" id="page" name="page" min="1" max={currentPageLimit} defaultValue={currentPage} onChange={handler} />
        </fieldset>
    )
}