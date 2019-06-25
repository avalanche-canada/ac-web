import React, { createElement } from 'react'
import styles from './Text.css'

export function Muted({ children, ...props }) {
    return (
        <p className={styles.Muted} {...props}>
            {children}
        </p>
    )
}

export function Loading({
    children = 'Loading...',
    component = 'p',
    ...props
}) {
    return createElement(
        component,
        Object.assign(props, {
            className: styles.Loading,
        }),
        children
    )
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

export function Warning({ children, component = 'p', ...props }) {
    return createElement(
        component,
        Object.assign(props, {
            className: styles.Warning,
        }),
        children
    )
}
