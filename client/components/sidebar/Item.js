import React from 'react'
import styles from './Sidebar.css'

export default function Item({ children, ...props }) {
    return (
        <div {...props} className={styles.Item}>
            {children}
        </div>
    )
}
