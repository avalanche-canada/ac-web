import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import ItemSet from './ItemSet'
import Toolbar from './Toolbar'
import styles from './Drawer.css'

Drawer.propTypes = {
    label: PropTypes.string.isRequired,
    home: Toolbar.propTypes.home,
    to: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
}

export default function Drawer({
    label,
    to,
    onClose,
    onClick,
    children,
    home,
}) {
    function handleClick(event) {
        const { target, currentTarget } = event

        if (target !== currentTarget) {
            return
        }

        onClick(event)
    }

    return (
        <nav className={styles.Drawer} onClick={handleClick}>
            <Toolbar home={home} onClose={onClose} />
            {Array.isArray(children) ? (
                <ItemSet label={label} to={to} items={children} />
            ) : (
                <ItemSet label={label} to={to}>
                    {createElement(children, { to })}
                </ItemSet>
            )}
        </nav>
    )
}
