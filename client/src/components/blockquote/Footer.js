import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './Blockquote.css'

function Footer({children}) {
    return (
        <footer styleName='Footer'>
            {children}
        </footer>
    )
}

export default CSSModules(Footer, styles)
