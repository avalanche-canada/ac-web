import React from 'react'
import PropTypes from 'prop-types'
import styles from './Pill.css'

Item.propTypes = {
    children: PropTypes.node.isRequired,
    active: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
}

export default function Item({ active = false, onClick, children }) {
    const className = active ? 'Item--Active' : 'Item'

    return (
        <li className={styles[className]} onClick={onClick}>
            {children}
        </li>
    )
}
