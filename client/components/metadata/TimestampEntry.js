import React from 'react'
import PropTypes from 'prop-types'
import Entry from './Entry'
import { DateTime } from '~/components/misc'

TimestampEntry.propTypes = {
    term: PropTypes.string,
    timestamp: PropTypes.instanceOf(Date),
    hideIfNil: PropTypes.boolean,
}

export default function TimestampEntry({ term, timestamp, hideIfNil }) {
    if (hideIfNil && !timestamp) {
        return null
    }

    return (
        <Entry term={term}>
            <DateTime value={timestamp} />
        </Entry>
    )
}
