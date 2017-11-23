import React from 'react'
import PropTypes from 'prop-types'
import styles from './Metadata.css'

Metadata.propTypes = {
    children: PropTypes.node.isRequired,
}

export default function Metadata({ children, ...props }) {
    return (
        <div {...props} className={styles.Metadata}>
            {children}
        </div>
    )
}
