import React, { useState } from 'react'
import PropTypes from 'prop-types'
import format from 'date-fns/format'
import { Link } from '@reach/router'
import { DateElement } from 'components/time'
import { DayPicker } from 'components/controls'
import styles from './ArchiveDatePicker.css'

// TODO: Move to another location, so it can be used between components.

ArchiveDatePicker.propTypes = {
    region: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date),
}

export default function ArchiveDatePicker(props) {
    const { region } = props
    const [date, setDate] = useState(props.date)

    return (
        <div className={styles.Container}>
            <DayPicker date={date} onChange={setDate}>
                {date ? <DateElement value={date} /> : 'Select a date'}
            </DayPicker>
            {date && (
                <Link
                    className={styles.Link}
                    to={`/forecasts/archives/${region}/${format(
                        date,
                        'YYYY-MM-DD'
                    )}`}>
                    Read avalanche bulletin
                </Link>
            )}
        </div>
    )
}
