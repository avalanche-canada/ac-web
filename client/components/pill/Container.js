import React from 'react'
import styles from './Pill.css'

export default function Container({ children, ...props }) {
    return (
        <div {...props} className={styles.Container}>
            {children}
        </div>
    )
}
