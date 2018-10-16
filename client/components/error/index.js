import React from 'react'
import PropTypes from 'prop-types'
import styles from './Error.css'

Error.propTypes = {
    children: PropTypes.element,
}

export default function Error({ children }) {
    return <section className={styles.Container}>{children}</section>
}
