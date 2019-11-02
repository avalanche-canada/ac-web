import React from 'react'
import styles from './Drawer.css'

// TODO Could probably remove that component

export default function Container({ children, ...props }) {
    return (
        <div {...props} className={styles.Container}>
            {children}
        </div>
    )
}
