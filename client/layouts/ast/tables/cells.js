import PropTypes from 'prop-types'
import { MINIMUM_DISTANCE } from '../constants'

Distance.propTypes = {
    value: PropTypes.number,
    min: PropTypes.number,
    unit: PropTypes.string,
}

export function Distance({ value, min = MINIMUM_DISTANCE, unit = 'km' }) {
    if (typeof value === 'number') {
        return value <= min ? `< ${min} ${unit}` : `${Math.ceil(value)} ${unit}`
    }

    return 'N/A'
}

Tags.propTypes = {
    value: PropTypes.array,
}

export function Tags({ value = [] }) {
    return value.sort().join(', ')
}
