import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import styles from './Page.css'

List.propTypes = {
    children: PropTypes.node,
    column: PropTypes.number,
    data: PropTypes.array,
    renderItem: PropTypes.function,
}

export default function List({ data, renderItem, children, column }) {
    const style = typeof column === 'number' ? { columnCount: column } : null

    return (
        <ul style={style} className={styles.List}>
            {children || data.map(renderItem)}
        </ul>
    )
}

Item.propTypes = {
    children: PropTypes.number,
    to: PropTypes.string.isRequired,
    target: PropTypes.string,
}

export function Item({ children, to, ...link }) {
    return (
        <li>
            {link.target ? (
                <a href={to} {...link}>
                    {children}
                </a>
            ) : (
                <Link to={to} {...link}>
                    {children}
                </Link>
            )}
        </li>
    )
}
