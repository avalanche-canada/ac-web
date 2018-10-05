import React from 'react'
import PropTypes from 'prop-types'
import styles from './Media.css'
import classnames from 'classnames'

Media.propTypes = {
    caption: PropTypes.node,
    className: PropTypes.string,
    children: PropTypes.node,
}

export function Media({ caption, className, children }) {
    return (
        <figure className={classnames(styles.Container, className)}>
            {children}
            {caption}
        </figure>
    )
}

Caption.propTypes = {
    children: PropTypes.node.isRequired,
}

export function Caption({ children }) {
    return <figcaption className={styles.Caption}>{children}</figcaption>
}
