import React from 'react'
import PropTypes from 'prop-types'
import styles from './Blockquote.module.css'

Blockquote.propTypes = {
    children: PropTypes.node.isRequired,
}

export function Blockquote({ children }) {
    return <blockquote className={styles.Blockquote}>{children}</blockquote>
}

Footer.propTypes = {
    children: PropTypes.node.isRequired,
}

export function Footer({ children }) {
    return <footer className={styles.Footer}>{children}</footer>
}
