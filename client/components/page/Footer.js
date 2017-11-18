import React from 'react'
import PropTypes from 'prop-types'
import styles from './Page.css'

Footer.propTypes = {
    children: PropTypes.node.isRequired,
}

export default function Footer({ children }) {
    return <footer className={styles.Footer}>{children}</footer>
}
