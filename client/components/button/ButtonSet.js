import React from 'react'
import styles from './Button.module.css'

export default function ButtonSet({ children }) {
    return <div className={styles.Set}>{children}</div>
}
