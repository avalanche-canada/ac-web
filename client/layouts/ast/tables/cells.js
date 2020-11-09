import PropTypes from 'prop-types'
import { MINIMUM_DISTANCE } from '../constants'
import { useIntl } from 'react-intl'

Distance.propTypes = {
    value: PropTypes.number,
    min: PropTypes.number,
    unit: PropTypes.string,
}

export function Distance({ value, min = MINIMUM_DISTANCE, unit = 'km' }) {
    const intl = useIntl();
    if (typeof value === 'number') {
        return value <= min ? `< ${min} ${unit}` : `${Math.ceil(value)} ${unit}`
    }

    return intl.formatMessage({
        defaultMessage: 'N/A',
        description: 'Layout ast/tables/cells',
    })
}

Tags.propTypes = {
    value: PropTypes.array,
}

export function Tags({ value = [] }) {
    return value.sort().join(', ')
}
