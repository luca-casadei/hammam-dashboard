import { useState } from "react";
import "./scss/date-selector.scss"

export default function DateSelector() {

    const [fromDateValue, setFromDateValue] = useState<string>("");
    const [toDateValue, setToDateValue] = useState<string>("");
    const [fromTimeValue, setFromTimeValue] = useState<string>("");
    const [toTimeValue, setToTimeValue] = useState<string>("");

    return (
        <fieldset className="date-selector">
            <legend>Interval selector</legend>
            <div className="fromfields">
                <p>From:</p>
                <label htmlFor="datefrom">Date:</label>
                <input value={fromDateValue} onChange={e => setFromDateValue(e.target.value)} type="date" id="datefrom" />
                <label htmlFor="timefrom">Time:</label>
                <input value={fromTimeValue} onChange={e => setFromTimeValue(e.target.value)} type="time" id="timefrom" step={0.001} />
            </div>
            <div className="tofields">
                <p>To:</p>
                <label htmlFor="dateto">Date:</label>
                <input value={toDateValue} onChange={e => setToDateValue(e.target.value)} type="date" id="dateto" />
                <label htmlFor="timeto">Time:</label>
                <input value={toTimeValue} onChange={e => setToTimeValue(e.target.value)} type="time" id="timeto" step={0.001} />
            </div>
        </fieldset>
    )
}