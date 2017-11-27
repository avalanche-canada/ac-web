import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'components/controls'
import styles from './DateRange.css'
import { DayPicker } from 'components/pickers'
import { addDayToRange } from 'utils/date'
import { Focus } from 'react-powerplug'
import noop from 'lodash/noop'

// TODO: Use the control instead!

DateRange.propTypes = {
    from: PropTypes.instanceOf(Date).isRequired,
    to: PropTypes.instanceOf(Date).isRequired,
    onChange: PropTypes.func.isRequired,
}

export default function DateRange({ onChange = noop, ...range }) {
    function handleInputChange({ target }) {
        const { value, name } = target
        const range = { from, to }

        range[name] = value

        onChange(range)
    }
    function handleDayClick(day) {
        const range = addDayToRange(day, { from, to })

        onChange(range)
    }

    const { from, to } = range

    return (
        <Focus>
            {({ isFocus, bindFocus }) => (
                <div className={styles.Container}>
                    <div className={styles.InputSet}>
                        <Input
                            type="text"
                            placeholder="Start date"
                            name="from"
                            value={from}
                            onChange={handleInputChange}
                            {...bindFocus}
                        />
                        <Input
                            type="text"
                            placeholder="End date"
                            name="to"
                            value={to}
                            onChange={handleInputChange}
                            {...bindFocus}
                        />
                    </div>
                    {isFocus && (
                        <DayPicker
                            selectedDays={range}
                            onDayClick={handleDayClick}
                        />
                    )}
                </div>
            )}
        </Focus>
    )
}
