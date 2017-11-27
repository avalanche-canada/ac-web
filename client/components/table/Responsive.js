import React from 'react'
import styles from './Table.css'

export default function Responsive({ children, ...props }) {
    return (
        <div {...props} className={styles.Responsive}>
            {children}
        </div>
    )
}
