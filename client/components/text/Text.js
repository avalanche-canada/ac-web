import React, { createElement } from 'react'
import styles from './Text.css'

export function Muted({ children, ...props }) {
    return (
        <p className={styles.Muted} {...props}>
            {children}
        </p>
    )
}

export function Loading({ children = 'Loading...', show, ...props }) {
    return show === true || show === undefined ? (
        <p className={styles.Loading} {...props}>
            {children}
        </p>
    ) : null
}

export function Error({
    children = 'An error happened.',
    component = 'p',
    ...props
}) {
    Object.assign(props, { className: styles.Error })

    return createElement(component, props, children)
}

export function Helper({ children, ...props }) {
    return (
        <span className={styles.Helper} {...props}>
            {children}
        </span>
    )
}
