import React from 'react'
import PropTypes from 'prop-types'
import styles from './Form.css'

Legend.propTypes = {
    children: PropTypes.node.isRequired,
}

export default function Legend({ children }) {
    return <legend className={styles.Legend}>{children}</legend>
}
