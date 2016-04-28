import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Page.css'

function Aside({ children }) {
    return (
        <aside styleName='Aside'>
            {children}
        </aside>
    )
}

export default CSSModules(Aside, styles)
