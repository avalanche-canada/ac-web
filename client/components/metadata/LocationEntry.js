import React from 'react'
import PropTypes from 'prop-types'
import { Position } from 'components/misc'
import Entry from './Entry'
import { useToggle } from 'utils/react/hooks'

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
    const [on, toggle] = useToggle()

    return (
        <Entry term={term} onClick={toggle} style={STYLE}>
            <Position
                longitude={longitude}
                latitude={latitude}
                precision={precision}
                dms={on}
            />
        </Entry>
    )
}

// Constants
const STYLE = {
    cursor: 'pointer',
}
