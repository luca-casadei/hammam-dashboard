import "./scss/page-selector.scss"

export default function PageSelector({ currentPage, currentLimit, readNo, handler }: { currentPage: number, currentLimit: number, readNo: number, handler: (page: number) => void }) {
    const currentPageLimit: number = parseInt((readNo / currentLimit).toFixed(0))
    return (
        <fieldset className="page-selector">
            <legend>Page selector</legend>
            <p>Page {currentPage} out of {currentPageLimit}</p>
            <p>{readNo} total readings</p>
            <div>
                <label htmlFor="page">Goto:</label>
                <input 
                type="number" 
                id="page" 
                name="page" 
                min="1" 
                max={currentPageLimit} 
                defaultValue={currentPage} 
                onChange={e => handler(parseInt(e.target.value))} />
            </div>
        </fieldset>
    )
}