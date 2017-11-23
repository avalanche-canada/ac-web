import React from 'react'
import PropTypes from 'prop-types'
import styles from './Credit.css'

Credit.propTypes = {
    children: PropTypes.string.isRequired,
    compact: PropTypes.bool,
}

export default function Credit({ children, compact = false }) {
    const className = compact ? 'Credit--Compact' : 'Credit'

    return (
        <span data-label="Credit" className={styles[className]}>
            {children}
        </span>
    )
}
