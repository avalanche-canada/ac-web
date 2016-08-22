import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './Navbar.css'

function Section({children}) {
    return (
        <div styleName='Section'>
            {children}
        </div>
    )
}

export default CSSModules(Section, styles);
