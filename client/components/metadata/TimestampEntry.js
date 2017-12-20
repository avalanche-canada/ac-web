import React from 'react'
import PropTypes from 'prop-types'
import Entry from './Entry'
import { DateTime } from 'components/time'

TimestampEntry.propTypes = {
    term: PropTypes.string,
    timestamp: PropTypes.instanceOf(Date),
}

export default function TimestampEntry({ term, timestamp }) {
    return (
        <Entry term={term}>
            <DateTime value={timestamp} />
        </Entry>
    )
}
