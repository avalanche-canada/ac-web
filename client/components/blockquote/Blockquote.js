import React from 'react'
import PropTypes from 'prop-types'
import styles from './Blockquote.css'

Blockquote.propTypes = {
    children: PropTypes.node.isRequired,
}

export default function Blockquote({ children }) {
    return <blockquote className={styles.Blockquote}>{children}</blockquote>
}
