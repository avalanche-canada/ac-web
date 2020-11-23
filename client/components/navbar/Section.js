import React from 'react'
import styles from './Navbar.module.css'

export default function Section({ children, ...props }) {
    return (
        <div {...props} className={styles.Section}>
            {children}
        </div>
    )
}
