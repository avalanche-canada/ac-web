import React from 'react'
import styles from './Navbar.css'

export default function Section({ children, ...props }) {
    return (
        <div {...props} className={styles.Section}>
            {children}
        </div>
    )
}
