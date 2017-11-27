import React from 'react'
import PropTypes from 'prop-types'
import styles from './Drawer.css'

Subject.propTypes = {
    children: PropTypes.string.isRequired,
}

export default function Subject({ children }) {
    return (
        <div className={styles.Subject}>
            <span>{children}</span>
        </div>
    )
}
