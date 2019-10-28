import PropTypes from 'prop-types'
import coords from 'formatcoords'

Position.propTypes = {
    longitude: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
    dms: PropTypes.bool,
    precision: PropTypes.number,
}

export default function Position({ longitude, latitude, precision = 6, dms }) {
    const format = dms ? 'FFf' : 'f'
    const options = {
        decimalPlaces: dms ? precision - 2 : precision,
    }

    return coords(latitude, longitude)
        .format(format, options)
        .replace(/\s/g, '\u00a0')
}
