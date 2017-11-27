import React from 'react'
import PropTypes from 'prop-types'
import styles from './Problem.css'

Problem.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
}

export default function Problem({ title, children }) {
    return (
        <div className={styles.Container}>
            <h2 className={styles.Header}>{title}</h2>
            {children}
        </div>
    )
}
