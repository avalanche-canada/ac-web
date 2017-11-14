import React from 'react'
import PropTypes from 'prop-types'
import styles from './Table.css'

Footer.propTypes = {
    children: PropTypes.node.isRequired,
}

export default function Footer({ children }) {
    return <tfoot className={styles.Footer}>{children}</tfoot>
}
