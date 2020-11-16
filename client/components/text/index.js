import React from 'react'
import { FormattedMessage } from 'react-intl'
import styles from './Text.module.css'

// TODO Should be a typography???????
// typography.css
// typography.js

export function Muted({ as: Component = 'p', children, ...props }) {
    return (
        <Component {...props} className={styles.Muted}>
            {children}
        </Component>
    )
}

export function Loading({ as: Component = 'p', children, ...props }) {
    return (
        <Component {...props} className={styles.Loading}>
            {children || (
                <FormattedMessage
                    description="Component text/Loading"
                    defaultMessage="Loading..."
                />
            )}
        </Component>
    )
}

export function Error({ as: Component = 'p', children, ...props }) {
    return (
        <Component {...props} className={styles.Error}>
            {children || (
                <FormattedMessage
                    description="Component text/Loading"
                    defaultMessage="An error happened."
                />
            )}
        </Component>
    )
}

export function Helper({ as: Component = 'span', children, ...props }) {
    return (
        <Component {...props} className={styles.Helper}>
            {children}
        </Component>
    )
}

export function Warning({ as: Component = 'p', children, ...props }) {
    return (
        <Component {...props} className={styles.Warning}>
            {children}
        </Component>
    )
}
