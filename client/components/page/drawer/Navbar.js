import React from 'react'
import PropTypes from 'prop-types'
import styles from './Drawer.css'

Navbar.propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
}

export default function Navbar({ style, children }) {
    return (
        <nav className={styles.Navbar} style={style}>
            {children}
        </nav>
    )
}
