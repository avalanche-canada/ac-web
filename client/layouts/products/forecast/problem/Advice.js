import React from 'react'
import PropTypes from 'prop-types'
import { InnerHTML } from 'components/misc'
import styles from './Problem.css'

Advice.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
}

export default function Advice({ children }) {
    return (
        <div className={styles.Advice}>
            <h3 className={styles.SubHeader}>Travel and Terrain Advice</h3>
            <InnerHTML>{children}</InnerHTML>
        </div>
    )
}
