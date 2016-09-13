import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './Navbar.css'

function Header({children}) {
    return (
        <header styleName='Header'>
            {children}
        </header>
    )
}

export default CSSModules(Header, styles)
