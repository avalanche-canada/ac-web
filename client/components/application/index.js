import React from 'react'
import styles from './Application.css'

export default function Application({ children }) {
    return <div className={styles.Application}>{children}</div>
}
