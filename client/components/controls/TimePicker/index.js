import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import styles from './TimePicker.css'

TimePicker.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func,
    onFocus: PropTypes.func,
    step: PropTypes.number,
    autoFocus: PropTypes.bool,
}

export default function TimePicker({
    value = '',
    onChange,
    onKeyDown,
    onFocus,
    step,
    autoFocus,
}) {
    const [{ hour, minute }, setState] = useReducer(reducer, {
        hour: value.split(':')[0] || 0,
        minute: padMinute(value.split(':')[1]),
    })
    function handleHourChange(event) {
        let hour = Number(event.target.value)

        if (hour > 23 || hour < 0) {
            hour = 0
        }

        setState({ hour })
        onChange(`${hour}:${minute}`)
    }
    function handleMinuteChange(event) {
        let minute = Number(event.target.value)

        if (minute > 59 || minute < 0) {
            minute = 0
        }

        minute = padMinute(minute)

        setState({ minute })
        onChange(`${hour}:${minute}`)
    }

    return (
        <div className={styles.Container}>
            <label title="Hour" className={styles.Hour}>
                <input
                    value={hour}
                    name="time-picker-hour"
                    onChange={handleHourChange}
                    onKeyDown={onKeyDown}
                    type="number"
                    min="0"
                    max="23"
                    onFocus={onFocus}
                    autoFocus={autoFocus}
                />
                <span className={styles.Label}>Hour</span>
            </label>
            <label title="Minute" className={styles.Minute}>
                <input
                    value={minute}
                    name="time-picker-minute"
                    onChange={handleMinuteChange}
                    onKeyDown={onKeyDown}
                    type="number"
                    min="0"
                    max="59"
                    step={step}
                    onFocus={onFocus}
                />
                <span className={styles.Label}>Minute</span>
            </label>
        </div>
    )
}

// Utils
function padMinute(minute = 0) {
    return String(minute).padStart(2, '0')
}
function reducer(oldState, newState) {
    return {
        ...oldState,
        ...newState,
    }
}
