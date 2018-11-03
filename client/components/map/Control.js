import { Component } from 'react'
import PropTypes from 'prop-types'

export const TOP_LEFT = 'top-left'
export const TOP_RIGHT = 'top-right'
export const BOTTOM_LEFT = 'bottom-left'
export const BOTTOM_RIGHT = 'bottom-right'

// TODO: USE HOOKS

export default class Control extends Component {
    static propTypes = {
        map: PropTypes.object, // actually isRequired
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
    shouldComponentUpdate(nextProps, nextState) {
        return false
    }
    componentDidMount() {
        const { position, factory, map } = this.props
        const control = factory()

        map.addControl(control, position)
    }
    render() {
        return null
    }
}
