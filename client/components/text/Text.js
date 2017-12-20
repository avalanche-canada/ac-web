import React from 'react'
import styles from './Text.css'

export function Text({ children }) {
    return <p className={styles.Text}>{children}</p>
}

export function Muted({ children }) {
    return <p className={styles.Muted}>{children}</p>
}

export function Loading({ children = 'Loading...' }) {
    return <p className={styles.Loading}>{children}</p>
}

export function Error({ children = 'An error happened.' }) {
    return <p className={styles.Error}>{children}</p>
}

export function Warning({ children }) {
    return <p className={styles.Warning}>{children}</p>
}

export function Helper({ children, title }) {
    return (
        <span className={styles.Helper} title={title}>
            {children}
        </span>
    )
}
