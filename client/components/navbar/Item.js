import React from 'react'
import PropTypes from 'prop-types'
import { compose, onlyUpdateForKeys } from 'recompose'
import CSSModules from 'react-css-modules'
import styles from './Navbar.css'
import noop from 'lodash/noop'

const NOWRAP_STYLE = {
    whiteSpace: 'nowrap',
}

Item.propTypes = {
    title: PropTypes.node.isRequired,
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
            style={noWrap ? NOWRAP_STYLE : null}
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

// export const Login = compose(
//     item,
//     defaultProps({
//         title: 'Login',
//     })
// )
//
// export const Logout = compose(
//     item,
//     defaultProps({
//         title: 'Logout',
//     }),
//     withProps(props => ({
//         children: null,
//     }))
// )
