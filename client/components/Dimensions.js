import React, { Component } from 'react'
import PropTypes from 'prop-types'
import throttle from 'lodash/throttle'

// TODO: HOOKS

export default class Dimensions extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
    }
    state = {
        width: null,
        height: null,
    }
    ref = node => (this.node = node)
    set = () =>
        this.node &&
        this.setState({
            width: this.node.offsetWidth,
            height: this.node.offsetHeight,
        })
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
            <div {...props} ref={this.ref}>
                {children(this.state)}
            </div>
        )
    }
}

export class Window extends Component {
    static propTypes = {
        children: PropTypes.func.isRequired,
    }
    state = {
        width: window.innerWidth,
        height: window.innerHeight,
    }
    set = () => {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    }
    update = throttle(this.set, 250)
    componentDidMount() {
        window.addEventListener('resize', this.update, false)
        window.addEventListener('orientationchange', this.update, false)
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.update)
        window.removeEventListener('orientationchange', this.update)
    }
    render() {
        return this.props.children(this.state)
    }
}
