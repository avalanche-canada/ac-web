import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import styles from './Page.css'

List.propTypes = {
    children: PropTypes.node,
    column: PropTypes.number,
}

export default function List({ children, column }) {
    let style = null

    if (typeof column === 'number') {
        style = {
            columnCount: column,
        }
    }
    return (
        <ul style={style} className={styles.List}>
            {children}
        </ul>
    )
}

Item.propTypes = {
    children: PropTypes.number,
    to: PropTypes.string.isRequired,
    target: PropTypes.string,
}

export function Item({ children, target, to, ...link }) {
    return (
        <li>
            {target ? (
                <a href={to} target={target} {...link}>
                    {children}
                </a>
            ) : (
                <Link to={to} target={target} {...link}>
                    {children}
                </Link>
            )}
        </li>
    )
}
