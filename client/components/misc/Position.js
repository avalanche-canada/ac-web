import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class Position extends PureComponent {
    static propTypes = {
        longitude: PropTypes.number.isRequired,
        latitude: PropTypes.number.isRequired,
        precision: PropTypes.number,
    }
    static defaultProps = {
        precision: 8,
    }
    render() {
        const { longitude, latitude, precision } = this.props

        return [
            <Coordinate precision={precision}>{longitude}</Coordinate>,
            ' ',
            <Coordinate precision={precision}>{latitude}</Coordinate>,
        ]
    }
}

export class Coordinate extends PureComponent {
    static propTypes = {
        children: PropTypes.number.isRequired,
        precision: PropTypes.number,
    }
    static defaultProps = {
        precision: 8,
    }
    render() {
        const { children, precision } = this.props

        return [children.toPrecision(precision), <span>&nbsp;</span>, '°']
    }
}
