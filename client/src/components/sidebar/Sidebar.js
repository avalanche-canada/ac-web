import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Sidebar.css'
import Follow from './Follow'
import Share from './Share'
import Contact from './Contact'

Sidebar.propTypes = {
    noSocial: PropTypes.bool,
    children: PropTypes.node,
}

function Sidebar({ noSocial = false, children }) {
    return (
        <nav styleName='Sidebar'>
            {children}
            {noSocial || <Share />}
            {noSocial || <Follow />}
            {noSocial || <Contact />}
        </nav>
    )
}

export default CSSModules(Sidebar, styles)
