import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import coords from 'formatcoords'

export default class Position extends PureComponent {
    static propTypes = {
        longitude: PropTypes.number.isRequired,
        latitude: PropTypes.number.isRequired,
        dms: PropTypes.bool,
        precision: PropTypes.number,
    }
    static defaultProps = {
        precision: 8,
    }
    render() {
        const { longitude, latitude, precision } = this.props
        const format = this.props.dms ? 'FFf' : 'f'
        const options = {
            latLonSeparator: SEPARATOR,
            decimalPlaces: precision,
        }
        const position = coords(latitude, longitude)
            .format(format, options)
            .replace(' ', '\u00a0')

        return position.replace(SEPARATOR, ' ')
    }
}

// Constants
const SEPARATOR = ':'
