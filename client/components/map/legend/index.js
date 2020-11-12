import React, { Children } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './styles.css'

Entry.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
}

export function Entry({ children }) {
    return (
        <div className={styles.Entry}>
            {children.find(isSymbol)}
            <div className={styles.Explanation}>
                {Children.toArray(children).filter(isNotSymbol)}
            </div>
        </div>
    )
}

Symbol.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
}

export function Symbol({ children, className, ...props }) {
    return (
        <div className={classnames(styles.Symbol, className)} {...props}>
            {children}
        </div>
    )
}

Name.propTypes = {
    children: PropTypes.string.isRequired,
}

export function Name({ children }) {
    return <div className={styles.Name}>{children}</div>
}

Description.propTypes = {
    children: PropTypes.node.isRequired,
}

export function Description({ children }) {
    return <div className={styles.Description}>{children}</div>
}

// Utils
function isSymbol({ type }) {
    return type === Symbol
}
function isNotSymbol({ type }) {
    return type !== Symbol
}
