import React, { PropTypes, cloneElement } from 'react'
import { withHandlers } from 'recompose'
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
    onHover: PropTypes.func,
    noWrap: PropTypes.bool,
}

function Item({ isActive = false, title, onClick = K, onHover = K, noWrap = false, children }) {
    return (
        <li style={createStyle(noWrap)} styleName={isActive ? 'Item--active' : 'Item'}>
            <a href='#'  {...{onClick, onHover}}>
                <span>{title}</span>
            </a>
            {children}
        </li>
    )
}

export default CSSModules(Item, styles)
