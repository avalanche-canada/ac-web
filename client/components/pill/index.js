import React, { Children, cloneElement, useState } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import styles from './Pill.css'

Pill.propTypes = {
    children: PropTypes.node.isRequired,
    active: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
}

export function Pill({ active = false, onClick, children }) {
    const className = active ? 'Item--Active' : 'Item'

    return (
        <li className={styles[className]} onClick={onClick}>
            {children}
        </li>
    )
}

PillSet.propTypes = {
    children: PropTypes.node.isRequired,
    activeIndex: PropTypes.number,
    onActivate: PropTypes.func,
}

export function PillSet({ activeIndex, onActivate = noop, children }) {
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
