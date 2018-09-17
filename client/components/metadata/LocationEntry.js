import React from 'react'
import PropTypes from 'prop-types'
import { Toggle } from 'react-powerplug'
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
        <Toggle>
            {({ on, toggle }) => (
                <Entry term={term} onClick={toggle} style={STYLE}>
                    <Position
                        longitude={longitude}
                        latitude={latitude}
                        precision={precision}
                        dms={on}
                    />
                </Entry>
            )}
        </Toggle>
    )
}

// Constants
const STYLE = {
    cursor: 'pointer',
}
