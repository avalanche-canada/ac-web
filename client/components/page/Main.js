import React from 'react'
import PropTypes from 'prop-types'
import styles from './Page.css'

Main.propTypes = {
    children: PropTypes.node.isRequired,
}

export default function Main({ children }) {
    return <main styleName={styles.Main}>{children}</main>
}
