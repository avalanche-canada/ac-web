import React from 'react'
import PropTypes from 'prop-types'
import styles from './Media.css'

Caption.propTypes = {
    children: PropTypes.node.isRequired,
}

export default function Caption({ children }) {
    return <figcaption className={styles.Caption}>{children}</figcaption>
}
