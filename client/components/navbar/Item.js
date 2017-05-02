import React from 'react'
import PropTypes from 'prop-types'
import { compose, onlyUpdateForKeys } from 'recompose'
import CSSModules from 'react-css-modules'
import styles from './Navbar.css'
import noop from 'lodash/noop'

function createStyle(noWrap) {
    return {
        whiteSpace: noWrap ? 'nowrap' : null,
    }
}

Item.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
    noWrap: PropTypes.bool,
    children: PropTypes.node,
}

function Item({
    isActive = false,
    title,
    onClick = noop,
    noWrap = false,
    children,
}) {
    return (
        <li
            style={createStyle(noWrap)}
            styleName={isActive ? 'Item--active' : 'Item'}>
            <a href="#" onClick={onClick}>
                <span>{title}</span>
            </a>
            {children}
        </li>
    )
}

export default compose(
    onlyUpdateForKeys(['isActive', 'children']),
    CSSModules(styles)
)(Item)
