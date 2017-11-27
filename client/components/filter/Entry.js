import React from 'react'
import styles from './Filter.css'

export default function Entry({ children, ...props }) {
    return (
        <div {...props} className={styles.Entry}>
            {children}
        </div>
    )
}
