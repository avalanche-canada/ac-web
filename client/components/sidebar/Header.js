import React from 'react'
import PropTypes from 'prop-types'
import styles from './Sidebar.css'

Header.propTypes = {
    children: PropTypes.node.isRequired,
}

export default function Header({ children }) {
    return <header className={styles.Header}>{children}</header>
}
