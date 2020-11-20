import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import endOfYesterday from 'date-fns/end_of_yesterday'
import DayPicker from 'react-day-picker'
import { FormattedMessage, useIntl } from 'react-intl'
import * as urls from 'utils/url'
import styles from './ArchiveDatePicker.css'
import { useLocaleUtils } from 'components/controls/DayPicker'
import { DateParam } from 'hooks/params'
import { DATE } from 'constants/intl'

ArchiveDatePicker.propTypes = {
    slug: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date),
}

export default function ArchiveDatePicker(props) {
    const intl = useIntl()
    const localeUtils = useLocaleUtils()
    const { slug } = props
    const [date, setDate] = useState(props.date || endOfYesterday())
    const to = urls.path('/forecasts/archives', slug, DateParam.format(date))
    function handleDayClick(day, { disabled }) {
        if (disabled) {
            return
        }
        setDate(day)
    }

    return (
        <div className={styles.Container}>
            <h3>
                <FormattedMessage defaultMessage="Select a date" />
            </h3>
            <DayPicker
                localeUtils={localeUtils}
                selectedDays={date}
                onDayClick={handleDayClick}
                fixedWeeks
                disabledDays={{ after: endOfYesterday() }}
            />
            <Link className={styles.Link} to={to}>
                <FormattedMessage
                    defaultMessage="Read the {date} avalanche forecast"
                    values={{
                        date: intl.formatDate(date, DATE),
                    }}
                />
            </Link>
        </div>
    )
}
