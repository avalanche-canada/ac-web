import React from 'react'
import styles from './Sponsor.css'

export default function ItemSet({ children, ...props }) {
    return (
        <div {...props} className={styles.ItemSet}>
            {children}
        </div>
    )
}
