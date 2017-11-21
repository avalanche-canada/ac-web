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
    update = throttle(() => {
        const { offsetWidth, offsetHeight } = this.ref

        this.setState({
            width: offsetWidth,
            height: offsetHeight,
        })
    }, 250)
    componentDidMount() {
        this.update()
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
