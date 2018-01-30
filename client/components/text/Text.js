import React from 'react'
import styles from './Text.css'

export function Text({ children, ...props }) {
    return (
        <p className={styles.Text} {...props}>
            {children}
        </p>
    )
}

export function Muted({ children, ...props }) {
    return (
        <p className={styles.Muted} {...props}>
            {children}
        </p>
    )
}

export function Loading({ children = 'Loading...', ...props }) {
    return (
        <p className={styles.Loading} {...props}>
            {children}
        </p>
    )
}

export function Error({ children = 'An error happened.', ...props }) {
    return (
        <p className={styles.Error} {...props}>
            {children}
        </p>
    )
}

export function Warning({ children, ...props }) {
    return (
        <p className={styles.Warning} {...props}>
            {children}
        </p>
    )
}

export function Helper({ children, ...props }) {
    return (
        <span className={styles.Helper} {...props}>
            {children}
        </span>
    )
}
