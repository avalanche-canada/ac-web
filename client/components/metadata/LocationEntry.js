import React from 'react'
import PropTypes from 'prop-types'
import { Position } from 'components/misc'
import Entry from './Entry'

LocationEntry.propTypes = {
    longitude: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
    precision: PropTypes.number,
    term: PropTypes.string,
}

export default function LocationEntry({
    term = 'Location',
    longitude,
    latitude,
    precision,
}) {
    return (
        <Entry term={term}>
            <Position
                longitude={longitude}
                latitude={latitude}
                precision={precision}
            />
        </Entry>
    )
}
