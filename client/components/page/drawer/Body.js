import React, { Component } from 'react'
import PropTypes from 'prop-types'
import throttle from 'lodash/throttle'
import styles from './Drawer.css'

export default class Body extends Component {
    static propTypes = {
        children: PropTypes.node,
        onScroll: PropTypes.func,
    }
    setRef = ref => (this.ref = ref)
    handleScroll = throttle(() => {
        if (this.ref) {
            this.props.onScroll({
                left: this.ref.scrollLeft,
                top: this.ref.scrollTop,
            })
        }
    }, 250)
    render() {
        const { children, onScroll, ...props } = this.props

        return (
            <div
                {...props}
                ref={this.setRef}
                onScroll={onScroll ? this.handleScroll : null}
                className={styles.Body}>
                {children}
            </div>
        )
    }
}
