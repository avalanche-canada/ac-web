import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import styles from './Page.css'

List.propTypes = {
    children: PropTypes.node,
}

export default function List({ children }) {
    return <ul className={styles.List}>{children}</ul>
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
