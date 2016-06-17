import React, {PropTypes} from 'react'
import {compose, branch, renderNothing, renderComponent, setDisplayName, withProps, defaultProps, setPropTypes} from 'recompose'
import CSSModules from 'react-css-modules'
import styles from './Navbar.css'

function K() {}

function createStyle(noWrap) {
    return {
        whiteSpace: noWrap ? 'nowrap' : null
    }
}

Item.propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
    noWrap: PropTypes.bool,
}

function Item({ isActive = false, title, onClick = K, noWrap = false, children }) {
    return (
        <li style={createStyle(noWrap)} styleName={isActive ? 'Item--active' : 'Item'}>
            <a href='#' onClick={onClick}>
                <span>{title}</span>
            </a>
            {children}
        </li>
    )
}

export default CSSModules(Item, styles)
