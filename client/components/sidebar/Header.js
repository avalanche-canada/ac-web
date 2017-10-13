import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Sidebar.css'

Header.propTypes = {
    children: PropTypes.node.isRequired,
}

function Header({ children }) {
    return (
        <header styleName="Header">
            {children}
        </header>
    )
}

export default CSSModules(Header, styles)
