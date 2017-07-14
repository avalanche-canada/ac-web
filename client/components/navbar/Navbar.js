import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Navbar.css'

Navbar.propTypes = {
    children: PropTypes.node.isRequired,
}

function Navbar({ children }) {
    return (
        <div styleName="Navbar">
            <nav styleName="Navigation">
                {children}
            </nav>
        </div>
    )
}

export default CSSModules(Navbar, styles)
