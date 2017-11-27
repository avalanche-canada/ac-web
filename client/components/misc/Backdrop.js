import React from 'react'
import PropTypes from 'prop-types'
import styles from './Backdrop.css'

Backdrop.propTypes = {
    onClick: PropTypes.func.isRequired,
}

export default function Backdrop({ onClick }) {
    return <div className={styles.Backdrop} onClick={onClick} />
}
