import { Component } from 'react'
import PropTypes from 'prop-types'

// TODO: Create a StaticComponent
export default class Device extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
    }
    state = {
        isTouchable: 'ontouchstart' in window,
    }
    render() {
        return this.props.children(this.state)
    }
}
