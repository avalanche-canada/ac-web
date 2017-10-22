import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Drawer.css'

Navbar.propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
}

function Navbar({ style, children }) {
    return (
        <nav styleName="Navbar" style={style}>
            {children}
        </nav>
    )
}

export default CSSModules(Navbar, styles)
