import React from 'react'
import PropTypes from 'prop-types'
import styles from './Page.css'

Nav.propTypes = {
    children: PropTypes.node.isRequired,
}

export default function Nav({ children }) {
    return <nav className={styles.Nav}>{children}</nav>
}
