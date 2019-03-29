import React from 'react'
import PropTypes from 'prop-types'
import { DateElement, Range } from 'components/time'
import styles from './MountainConditionsReport.css'

DateSet.propTypes = {
    values: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
}

export default function DateSet({ values }) {
    const [from, to] = values

    return (
        <div className={styles.Date}>
            {to ? <Range from={from} to={to} /> : <DateElement value={from} />}
        </div>
    )
}
