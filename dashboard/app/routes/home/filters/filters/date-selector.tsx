import { useState } from "react";
import "./scss/date-selector.scss"

export default function DateSelector({ toHandler, fromHandler }: {
    toHandler: (toDate: string) => void,
    fromHandler: (fromDate: string) => void
}
) {
    const [fromDateValue, setFromDateValue] = useState<string>("");
    const [toDateValue, setToDateValue] = useState<string>("");

    return (
        <fieldset className="date-selector">
            <legend>Interval selector</legend>
            <div className="fromfields">
                <label htmlFor="datefrom">From:</label>
                <input value={fromDateValue} onChange={e => {
                    setFromDateValue(e.target.value)
                    fromHandler(e.target.value)
                }} type="datetime-local" step={0.001} id="datefrom" />
            </div>
            <div className="tofields">
                <label htmlFor="dateto">To:</label>
                <input value={toDateValue} onChange={e => {
                    setToDateValue(e.target.value)
                    toHandler(e.target.value)
                }} type="datetime-local" step={0.001} id="dateto" />
            </div>
        </fieldset>
    )
}