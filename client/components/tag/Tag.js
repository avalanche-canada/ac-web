import React from 'react'
import PropTypes from 'prop-types'
import styles from './Tag.css'

Tag.propTypes = {
    children: PropTypes.node.isRequired,
}

export default function Tag({ children }) {
    return <li className={styles.Item}>{children}</li>
}
