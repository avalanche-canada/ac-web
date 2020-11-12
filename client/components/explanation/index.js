import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './Explanation.css'

Section.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    style: PropTypes.object,
}

export function Section({ style, children }) {
    return <section style={style}>{children}</section>
}

Header.propTypes = {
    children: PropTypes.string.isRequired,
    className: PropTypes.string,
}

export function Header({ className, children }) {
    return <h3 className={classnames(styles.Header, className)}>{children}</h3>
}

Content.propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
}

export function Content({ style, children }) {
    return (
        <div style={style} className={styles.Content}>
            {children}
        </div>
    )
}
