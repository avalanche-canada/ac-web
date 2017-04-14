import React, {Component} from 'react'
import PropTypes from 'prop-types'
import bind from 'element-resize-event'

export default class ElementResize extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
    }
    state = {
        width: null,
        height: null,
    }
    componentDidMount() {
        bind(this.refs.wrapper, this.updateDimensions)
        this.updateDimensions()
    }
    updateDimensions = event => {
        const {
            offsetWidth = null,
            offsetHeight = null
        } = this.refs.wrapper || {}

        this.setState({
            width: offsetWidth,
            height: offsetHeight,
        })
    }
    render() {
        return (
            <div ref='wrapper'>
                {this.props.children(this.state.width, this.state.height)}
            </div>
        )
    }
}
