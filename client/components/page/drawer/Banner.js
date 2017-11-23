import React from 'react'
import styles from './Drawer.css'

export default function Banner({ children, ...props }) {
    return (
        <div {...props} className={styles.Banner}>
            {children}
        </div>
    )
}
