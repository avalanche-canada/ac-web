import React from 'react'
import PropTypes from 'prop-types'
import Entry from './Entry'
import { DateTime } from 'components/time'

TimestampEntry.propTypes = {
    term: PropTypes.string,
    value: PropTypes.instanceOf(Date),
}

export default function TimestampEntry({ term, value }) {
    return (
        <Entry term={term}>
            <DateTime value={value} />
        </Entry>
    )
}
