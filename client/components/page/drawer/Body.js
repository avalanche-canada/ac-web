import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import throttle from 'lodash/throttle'
import styles from './Drawer.css'

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
        if (!this.ref) {
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
