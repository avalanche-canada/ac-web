import React, {Component} from 'react'
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
        const {offsetWidth, offsetHeight} = this.refs.wrapper

        this.setState({
            width: offsetWidth,
            height: offsetHeight,
        })
    }
    render() {
        const {width, height} = this.state

        return (
            <div ref='wrapper'>
                {this.props.children(width, height)}
            </div>
        )
    }
}
