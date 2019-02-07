import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import throttle from 'lodash/throttle'
import styles from './Drawer.css'

// TODO Improve that component with the container

export default class Body extends Component {
    static propTypes = {
        children: PropTypes.node,
        onScroll: PropTypes.func,
    }
    static defaultProps = {
        onScroll() {},
    }
    ref = createRef()
    handleScroll = throttle(() => {
        if (!this.ref?.current) {
            return
        }

        const { scrollLeft, scrollTop } = this.ref.current

        this.props.onScroll({
            left: scrollLeft,
            top: scrollTop,
        })
    }, 250)
    render() {
        const { children, onScroll, ...props } = this.props

        return (
            <div
                {...props}
                ref={this.ref}
                onScroll={this.handleScroll}
                className={styles.Body}>
                {children}
            </div>
        )
    }
}
