import "./scss/type-selector.scss"

export default function TypeSelector({ type, selectType }: { type: string, selectType: (type: string) => void }) {
    return (
        <div className="type-selector">
            <label htmlFor="type">Type:</label>
            <select value={type} onChange={e => selectType(e.target.value)} id="type" name="type">
                <option value="all">All</option>
                <option value="temperature">Temperature</option>
                <option value="humidity">Humidity</option>
            </select>
        </div>
    )
}