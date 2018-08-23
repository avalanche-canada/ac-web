import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { MINIMUM_DISTANCE } from '../constants'

export class Distance extends PureComponent {
    static propTypes = {
        value: PropTypes.number,
        min: PropTypes.number,
        unit: PropTypes.string,
    }
    static defaultProps = {
        min: MINIMUM_DISTANCE,
        unit: 'km',
    }
    render() {
        const { value, min, unit } = this.props

        if (typeof value === 'number') {
            return value <= min
                ? `< ${min} ${unit}`
                : `${Math.ceil(value)} ${unit}`
        }

        return 'N/A'
    }
}
