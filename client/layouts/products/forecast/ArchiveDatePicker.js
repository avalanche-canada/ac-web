import React, { useState } from 'react'
import PropTypes from 'prop-types'
import format from 'date-fns/format'
import { Link } from '@reach/router'
import DayPicker from 'react-day-picker'
import styles from './ArchiveDatePicker.css'
import { endOfYesterday } from 'date-fns'
import { DATE } from 'utils/date'

ArchiveDatePicker.propTypes = {
    region: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date),
}

export default function ArchiveDatePicker(props) {
    const { region } = props
    const [date, setDate] = useState(props.date || endOfYesterday())
    function handleDayClick(day, { disabled }) {
        if (disabled) {
            return
        }
        setDate(day)
    }

    return (
        <div className={styles.Container}>
            <h3>Select a date</h3>
            <DayPicker
                selectedDays={date}
                onDayClick={handleDayClick}
                fixedWeeks
                disabledDays={{ after: endOfYesterday() }}
            />
            <Link
                className={styles.Link}
                to={`/forecasts/archives/${region}/${format(
                    date,
                    'YYYY-MM-DD'
                )}`}>
                Read the {format(date, DATE)} bulletin
            </Link>
        </div>
    )
}
