import React from 'react'
import PropTypes from 'prop-types'
import styles from './Gram.css'

Location.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
}

export default function Location({ children }) {
    return <section className={styles.Location}>{children}</section>
}
