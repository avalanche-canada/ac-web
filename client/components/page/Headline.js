import React from 'react'
import styles from './Page.css'

export default function Headline({ children, ...props }) {
    return (
        <div {...props} className={styles.Headline}>
            {children}
        </div>
    )
}
