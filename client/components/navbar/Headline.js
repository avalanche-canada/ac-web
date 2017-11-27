import React from 'react'
import PropTypes from 'prop-types'
import styles from './Navbar.css'

Headline.propTypes = {
    children: PropTypes.node.isRequired,
}

export default function Headline({ children }) {
    return <p className={styles.Headline}>{children}</p>
}
