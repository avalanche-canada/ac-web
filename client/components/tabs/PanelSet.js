import React, { PureComponent, Children } from 'react'
import PropTypes from 'prop-types'
import styles from './Tabs.css'

export default class PanelSet extends PureComponent {
    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.element).isRequired,
        activeIndex: PropTypes.number,
    }
    render() {
        const { children, activeIndex } = this.props

        return Children.toArray(children)[activeIndex]
    }
}

export function Panel({ children }) {
    return <div className={styles.Panel}>{children}</div>
}
