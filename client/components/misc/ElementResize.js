import React, { Component } from 'react'
import PropTypes from 'prop-types'
import bind from 'element-resize-event'

export default class ElementResize extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
        style: PropTypes.object,
    }
    state = {
        width: null,
        height: null,
    }
    componentDidMount() {
        bind(this.refs.wrapper, this.updateDimensions)
        this.updateDimensions()
    }
    updateDimensions = () => {
        const { offsetWidth = null, offsetHeight = null } = this.refs
            .wrapper || {}

        this.setState({
            width: offsetWidth,
            height: offsetHeight,
        })
    }
    render() {
        return (
            <div style={this.props.style} ref="wrapper">
                {this.props.children(this.state.width, this.state.height)}
            </div>
        )
    }
}
