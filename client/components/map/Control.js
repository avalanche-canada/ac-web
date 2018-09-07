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
    componentDidMount() {
        const { position, factory } = this.props
        const control = factory()

        this.map.addControl(control, position)
    }
    setMap = map => {
        this.map = map

        return null
    }
    render() {
        return <Consumer>{this.setMap}</Consumer>
    }
}
