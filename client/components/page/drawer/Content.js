import React from 'react'
import styles from './Drawer.css'

export default function Content({ children, ...props }) {
    return (
        <div {...props} className={styles.Content}>
            {children}
        </div>
    )
}
