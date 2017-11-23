import React from 'react'
import PropTypes from 'prop-types'
import styles from './Table.css'

Header.propTypes = {
    children: PropTypes.node.isRequired,
}

export default function Header({ children }) {
    return <thead className={styles.Header}>{children}</thead>
}
