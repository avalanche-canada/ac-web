import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './Navbar.css'

function Section({ children }) {
    return (
        <section styleName='Section'>
            {children}
        </section>
    )
}

export default CSSModules(Section, styles);
