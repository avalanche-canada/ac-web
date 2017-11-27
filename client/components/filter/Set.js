import React from 'react'
import styles from './Filter.css'

export default function Set({ children, ...props }) {
    return (
        <div {...props} className={styles.Set}>
            {children}
        </div>
    )
}
