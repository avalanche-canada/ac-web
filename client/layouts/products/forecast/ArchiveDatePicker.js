import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import endOfYesterday from 'date-fns/end_of_yesterday'
import DayPicker from 'react-day-picker'
import { DateElement } from 'components/time'
import * as urls from 'utils/url'
import styles from './ArchiveDatePicker.css'
import { DateParam } from 'hooks/params'

ArchiveDatePicker.propTypes = {
    region: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date),
}

export default function ArchiveDatePicker(props) {
    const { region } = props
    const [date, setDate] = useState(props.date || endOfYesterday())
    const to = urls.path('/forecasts/archives', region, DateParam.format(date))
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
            <Link className={styles.Link} to={to}>
                Read the&nbsp;
                <DateElement value={date} />
                &nbsp;bulletin
            </Link>
        </div>
    )
}
