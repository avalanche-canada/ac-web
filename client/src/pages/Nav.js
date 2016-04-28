import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Page.css'

function Nav({ children }) {
    return (
        <nav styleName='Nav'>
            {children}
        </nav>
    )
}

export default CSSModules(Nav, styles)
