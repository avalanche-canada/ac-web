import React, { Component } from 'react'
import PropTypes from 'prop-types'
import throttle from 'lodash/throttle'

export default class Scroll extends Component {
    static propTypes = {
        children: PropTypes.func,
    }
    state = {}
    setRef = ref => (this.ref = ref)
    handleScroll = throttle(() => {
        this.setState({
            left: this.ref.scrolLeft,
            top: this.ref.scrollTop,
        })
    }, 250)
    render() {
        return <div ref={this.setRef}>{this.props.children(this.state)}</div>
    }
}
