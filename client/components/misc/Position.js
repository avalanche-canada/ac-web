import { memo } from 'react'
import PropTypes from 'prop-types'
import coords from 'formatcoords'

Position.propTypes = {
    longitude: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
    dms: PropTypes.bool,
    precision: PropTypes.number,
}

function Position({ longitude, latitude, precision = 8, dms }) {
    const format = dms ? 'FFf' : 'f'
    const options = {
        latLonSeparator: SEPARATOR,
        decimalPlaces: precision,
    }
    const position = coords(latitude, longitude)
        .format(format, options)
        .replace(/\s/g, '\u00a0')

    return position.replace(SEPARATOR, ' ')
}

export default memo(Position)

// Constants
const SEPARATOR = ':'
