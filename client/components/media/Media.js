import React from 'react'
import PropTypes from 'prop-types'
import styles from './Media.css'

Media.propTypes = {
    caption: PropTypes.node,
    children: PropTypes.node,
}

export default function Media({ caption, children }) {
    return (
        <figure className={styles.Container}>
            {children}
            {caption}
        </figure>
    )
}
