import React from 'react'
import PropTypes from 'prop-types'
import styles from './Navbar.css'

Navbar.propTypes = {
    children: PropTypes.node.isRequired,
}

export default function Navbar({ children }) {
    return (
        <div className={styles.Navbar}>
            <nav className={styles.Navigation}>{children}</nav>
        </div>
    )
}
