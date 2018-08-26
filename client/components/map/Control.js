import React from 'react'
import PropTypes from 'prop-types'
import StaticComponent from 'components/StaticComponent'
import { Consumer } from './Context'

export const TOP_LEFT = 'top-left'
export const TOP_RIGHT = 'top-right'
export const BOTTOM_LEFT = 'bottom-left'
export const BOTTOM_RIGHT = 'bottom-right'

export default class Control extends StaticComponent {
    static propTypes = {
        factory: PropTypes.func.isRequired,
        position: PropTypes.oneOf([
            TOP_LEFT,
            TOP_RIGHT,
            BOTTOM_LEFT,
            BOTTOM_RIGHT,
        ]),
    }
    static defaultProps = {
        position: BOTTOM_RIGHT,
    }
    addControl = map => {
        if (this.control) {
            return
        }

        const { position, factory } = this.props

        this.map = map
        this.control = factory()

        map.addControl(this.control, position)
    }
    componentWillUnmount() {
        this.map.removeControl(this.control)
    }
    render() {
        return <Consumer>{this.addControl}</Consumer>
    }
}
