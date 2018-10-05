import React from 'react'
import styles from './Filter.css'

export function FilterSet({ children, ...props }) {
    return (
        <div {...props} className={styles.Set}>
            {children}
        </div>
    )
}

export function FilterEntry({ children, ...props }) {
    return (
        <div {...props} className={styles.Entry}>
            {children}
        </div>
    )
}
