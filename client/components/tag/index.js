import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './Tag.css'

TagSet.propTypes = {
    children: PropTypes.node.isRequired,
}

export function TagSet({ children }) {
    return <ul className={styles.Set}>{children}</ul>
}

Tag.propTypes = {
    children: PropTypes.node.isRequired,
    as: PropTypes.oneOf([PropTypes.string, PropTypes.object]),
    className: PropTypes.string,
}

export function Tag({ as: As = 'li', className, children, ...rest }) {
    const props = Object.assign(rest, {
        className: classnames(styles.Item, className),
    })

    return <As {...props}>{children}</As>
}
