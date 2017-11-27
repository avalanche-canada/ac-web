import React from 'react'
import styles from './Page.css'

export default function Content({ children, ...props }) {
    return (
        <div {...props} className={styles.Content}>
            {children}
        </div>
    )
}
