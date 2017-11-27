import React from 'react'
import PropTypes from 'prop-types'
import styles from './Sidebar.css'

Sidebar.propTypes = {
    children: PropTypes.node.isRequired,
}

export default function Sidebar({ children }) {
    return <nav className={styles.Sidebar}>{children}</nav>
}
