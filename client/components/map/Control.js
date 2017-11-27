import { Component } from 'react'
import PropTypes from 'prop-types'

export const TOP_LEFT = 'top-left'
export const TOP_RIGHT = 'top-right'
export const BOTTOM_LEFT = 'bottom-left'
export const BOTTOM_RIGHT = 'bottom-right'

export default class Control extends Component {
    static propTypes = {
        factory: PropTypes.func.isRequired,
        position: PropTypes.oneOf([
            TOP_LEFT,
            TOP_RIGHT,
            BOTTOM_LEFT,
            BOTTOM_RIGHT,
        ]),
    }
    static contextTypes = {
        map: PropTypes.object.isRequired,
    }
    static defaultProps = {
        position: BOTTOM_RIGHT,
    }
    shouldComponentUpdate() {
        return false
    }
    componentDidMount() {
        const { position, factory } = this.props
        const control = (this.control = factory())

        this.context.map.addControl(control, position)
    }
    componentWillUnmount() {
        this.context.map.removeControl(this.control)
    }
    render() {
        return null
    }
}
