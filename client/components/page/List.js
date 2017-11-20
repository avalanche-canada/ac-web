import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
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
}

export function Item({ children, ...link }) {
    return (
        <li>
            <Link {...link}>{children}</Link>
        </li>
    )
}
