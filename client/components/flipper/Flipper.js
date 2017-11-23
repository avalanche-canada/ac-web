import React from 'react'
import styles from './Flipper.css'

export default function Flipper({ children, ...props }) {
    return (
        <div {...props} className={styles.Container}>
            {children}
        </div>
    )
}
