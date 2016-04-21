import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Sidebar.css'

Header.propTypes = {
    children: PropTypes.string.isRequired
}

function Header({ children }) {
    return (
        <header styleName='Header'>
            {children}
        </header>
    )
}

export default CSSModules(Header, styles)
