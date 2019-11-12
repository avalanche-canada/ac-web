import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import styles from './TimePicker.css'

TimePicker.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
}

export default function TimePicker({ value = '', onChange }) {
    const [{ hour, minute }, setState] = useReducer(merger, {
        hour: value.split(':')[0] || 0,
        minute: value.split(':')[1].padStart(2, '0'),
    })
    function handleHourChange(event) {
        const hour = event.target.value

        setState({
            hour: Number(hour),
        })
        onChange(`${hour}:${minute}`)
    }
    function handleMinuteChange(event) {
        const minute = event.target.value

        setState({
            minute: Number(minute),
        })
        onChange(`${hour}:${minute}`)
    }

    return (
        <div className={styles.Container}>
            <label title="Hour" className={styles.Hour}>
                <select value={hour} onChange={handleHourChange}>
                    {HOURS.map(hour => (
                        <option key={hour} value={hour}>
                            {hour}
                        </option>
                    ))}
                </select>
                <span className={styles.Label}>Hour</span>
            </label>
            <label title="Minute" className={styles.Minute}>
                <select value={minute} onChange={handleMinuteChange}>
                    {MINUTES.map(minute => (
                        <option key={minute} value={minute}>
                            {minute}
                        </option>
                    ))}
                </select>
                <span className={styles.Label}>Minute</span>
            </label>
        </div>
    )
}

// Utils
const HOURS = Array(24)
    .fill(null)
    .map((value, index) => String(index))
const MINUTES = Array(60 / 5)
    .fill(null)
    .map((value, index) => String(index * 5).padStart(2, '0'))
function merger(oldState, newState) {
    return {
        ...oldState,
        ...newState,
    }
}
