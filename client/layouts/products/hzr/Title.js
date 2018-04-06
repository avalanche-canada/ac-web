import React from 'react'
import PropTypes from 'prop-types'
import styles from './HotZoneReport.css'

Title.propTypes = {
    children: PropTypes.string.isRequired,
}

export default function Title({ children }) {
    return <div className={styles.Title}>{children}</div>
}
