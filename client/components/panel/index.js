import React from 'react'
import PropTypes from 'prop-types'
import styles from './Panel.css'

Panel.propTypes = {
    expanded: PropTypes.bool,
    header: PropTypes.node.isRequired,
    children: PropTypes.string.isRequired,
}

export default function Panel({ header, expanded = false, children }) {
    return (
        <details open={expanded} className={styles.Container}>
            <summary>{header}</summary>
            {children}
        </details>
    )
}
