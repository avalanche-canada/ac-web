import React, { Children, cloneElement, useState } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import classnames from 'classnames'
import styles from './Pill.css'

Item.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    active: PropTypes.bool,
}

export function Item({ active, children, ...props }) {
    const className = classnames(styles.Item, active && styles.Active)

    return (
        <li {...props} className={className}>
            {children}
        </li>
    )
}

Set.propTypes = {
    children: PropTypes.node.isRequired,
    activeIndex: PropTypes.number,
    onActivate: PropTypes.func,
}

export function Set({ activeIndex, onActivate = noop, children }) {
    const [value, set] = useState(activeIndex)

    return (
        <ul className={styles.Set}>
            {Children.map(children, (item, index) =>
                cloneElement(item, {
                    active: value === index,
                    onClick() {
                        set(index)
                        onActivate(index)
                    },
                })
            )}
        </ul>
    )
}

export function Container({ children, ...props }) {
    return (
        <div {...props} className={styles.Container}>
            {children}
        </div>
    )
}
