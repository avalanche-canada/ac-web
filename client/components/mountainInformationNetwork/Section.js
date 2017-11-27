import React from 'react'
import PropTypes from 'prop-types'
import styles from './MountainInformationNetwork.css'

Section.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

export default function Section({ title = 'Information', children }) {
    return (
        <div className={styles.Section}>
            <h4 className={styles['Section--Title']}>{title}</h4>
            <div className={styles['Section--Content']}>{children}</div>
        </div>
    )
}
