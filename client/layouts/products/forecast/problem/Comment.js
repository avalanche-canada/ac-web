import React from 'react'
import PropTypes from 'prop-types'
import styles from './Problem.css'
import { InnerHTML } from 'components/misc'

Comment.propTypes = {
    children: PropTypes.string.isRequired,
}

export default function Comment({ children }) {
    return (
        <div className={styles.Comment}>
            <InnerHTML>{children}</InnerHTML>
        </div>
    )
}
