import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import styles from './Tag.css'

TagSet.propTypes = {
    children: PropTypes.node.isRequired,
}

export function TagSet({ children }) {
    return <ul className={styles.Set}>{children}</ul>
}

Tag.propTypes = {
    children: PropTypes.node.isRequired,
    as: PropTypes.string,
}

export function Tag({ as = 'li', children }) {
    const props = {
        className: styles.Item,
    }

    return createElement(as, props, children)
}
