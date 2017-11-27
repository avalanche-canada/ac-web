import React from 'react'
import styles from './Drawer.css'

export default function Body({ children, ...props }) {
    return (
        <div {...props} className={styles.Body}>
            {children}
        </div>
    )
}
