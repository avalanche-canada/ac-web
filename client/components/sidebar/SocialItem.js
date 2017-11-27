import React from 'react'
import PropTypes from 'prop-types'
import styles from './Sidebar.css'

SocialItem.propTypes = {
    label: PropTypes.string,
    children: PropTypes.node.isRequired,
}

export default function SocialItem({ label, children }) {
    return (
        <div className={styles.SocialItem}>
            {label && <span className={styles.Label}>{label}</span>}
            {children}
        </div>
    )
}
