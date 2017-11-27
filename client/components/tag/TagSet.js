import React from 'react'
import PropTypes from 'prop-types'
import styles from './Tag.css'

TagSet.propTypes = {
    children: PropTypes.node.isRequired,
}

export default function TagSet({ children }) {
    return <ul className={styles.Set}>{children}</ul>
}
