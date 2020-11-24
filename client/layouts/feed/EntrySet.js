import React from 'react'
import styles from './Feed.module.css'

export default function EntrySet({ children, ...props }) {
    return (
        <div {...props} className={styles.EntrySet}>
            {children}
        </div>
    )
}
