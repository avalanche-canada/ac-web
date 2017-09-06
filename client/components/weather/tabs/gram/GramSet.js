import React from 'react'
import PropTypes from 'prop-types'
import styles from './Gram.css'

GramSet.propTypes = {
    children: PropTypes.node.isRequired,
}

export default function GramSet({ children }) {
    return (
        <div className={styles.GramSet}>
            {children}
        </div>
    )
}
