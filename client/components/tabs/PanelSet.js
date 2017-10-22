import React, { PureComponent, Children } from 'react'
import PropTypes from 'prop-types'
import styles from './Tabs.css'

export default class PanelSet extends PureComponent {
    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.element).isRequired,
        activeIndex: PropTypes.number,
    }
    get children() {
        const { children } = this.props

        return Array.isArray(children) ? children : Children.toArray(children)
    }
    render() {
        const { activeIndex } = this.props

        return this.children[activeIndex] || null
    }
}

export function Panel({ children }) {
    return <div className={styles.Panel}>{children}</div>
}
