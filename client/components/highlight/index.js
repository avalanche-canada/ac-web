import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './Highlight.css'

Highlight.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
}

export default function Highlight({ children, className, ...props }) {
    return (
        <div className={classnames(styles.Highlight, className)} {...props}>
            {children}
        </div>
    )
}
