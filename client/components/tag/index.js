import React from 'react'
import PropTypes from 'prop-types'
import styles from './Tag.css'

TagSet.propTypes = {
    children: PropTypes.node.isRequired,
}

export function TagSet({ children }) {
    return <ul className={styles.Set}>{children}</ul>
}

Tag.propTypes = {
    children: PropTypes.node.isRequired,
}

export function Tag({ children }) {
    return <li className={styles.Item}>{children}</li>
}
