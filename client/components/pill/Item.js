import React from 'react'
import PropTypes from 'prop-types'
import styles from './Pill.css'
import noop from 'lodash/noop'

Item.propTypes = {
    children: PropTypes.node.isRequired,
    active: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
}

export default function Item({ active = false, onClick = noop, children }) {
    const className = active ? 'Item--Active' : 'Item'

    return (
        <li className={styles[className]} onClick={onClick}>
            {children}
        </li>
    )
}
