import React from 'react'
import styles from './QuestionAnswer.css'

export default function Answer({ children, ...props }) {
    return (
        <div {...props} className={styles.Answer}>
            {children}
        </div>
    )
}
