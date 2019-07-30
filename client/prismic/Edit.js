import React from 'react'
import classnames from 'classnames'
import styles from './Edit.css'

export default function Edit({ id, position }) {
    return id ? (
        <span
            data-wio-id={id}
            className={classnames(styles.button, styles[position])}
        />
    ) : null
}
