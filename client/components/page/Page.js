import React from 'react'
import classnames from 'classnames'
import styles from './Page.css'

export default function Page({ children, className, ...props }) {
    return (
        <div {...props} className={classnames(styles.Page, className)}>
            {children}
        </div>
    )
}
