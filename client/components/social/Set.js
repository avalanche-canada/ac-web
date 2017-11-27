import React from 'react'
import styles from './Social.css'

export default function SocialSet({ children, ...props }) {
    return (
        <div {...props} className={styles.Set}>
            {children}
        </div>
    )
}
