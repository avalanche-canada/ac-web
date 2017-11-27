import React from 'react'
import PropTypes from 'prop-types'
import styles from './Table.css'

Caption.propTypes = {
    children: PropTypes.node.isRequired,
}

export default function Caption({ children }) {
    return <caption className={styles.Caption}>{children}</caption>
}
