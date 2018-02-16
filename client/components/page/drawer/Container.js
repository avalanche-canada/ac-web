import React, { Component, Children, cloneElement } from 'react'
import Header from './Header'
import Body from './Body'
import styles from './Drawer.css'

export default class Container extends Component {
    state = {
        scroll: {
            top: 0,
        },
    }
    handleBodyScroll = scroll => this.setState({ scroll })
    cloneChild = child => {
        switch (child.type) {
            case Header:
                return cloneElement(child, {
                    showBorder: this.state.scroll.top > 0,
                })
            case Body:
                return cloneElement(child, {
                    onScroll: this.handleBodyScroll,
                })
            default:
                return child
        }
    }
    render() {
        const { children, ...props } = this.props

        return (
            <div {...props} className={styles.Container}>
                {Children.toArray(children)
                    .filter(Boolean)
                    .map(this.cloneChild)}
            </div>
        )
    }
}
