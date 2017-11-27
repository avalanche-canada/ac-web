import React, { Component } from 'react'
import PropTypes from 'prop-types'
import throttle from 'lodash/throttle'

export default class Dimensions extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
    }
    state = {
        width: null,
        height: null,
    }
    setRef = ref => (this.ref = ref)
    set = () =>
        this.setState({
            width: this.ref.offsetWidth,
            height: this.ref.offsetHeight,
        });
    update = throttle(this.set, 250)
    componentDidMount() {
        this.set()
        window.addEventListener('resize', this.update, false)
        window.addEventListener('orientationchange', this.update, false)
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.update)
        window.removeEventListener('orientationchange', this.update)
    }
    render() {
        const { children, ...props } = this.props

        return (
            <div {...props} ref={this.setRef}>
                {children(this.state)}
            </div>
        )
    }
}
