import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Sidebar.css'
import Follow from './Follow'
import Share from './Share'
import Contact from './Contact'
import Item from './Item'

Sidebar.propTypes = {
    noSocial: PropTypes.bool,
    children: PropTypes.arrayOf(Item),
}

function Sidebar({ children, noSocial = false }) {
    const withSocial = !noSocial

    return (
        <div styleName='Sidebar'>
            {children}
            {withSocial && <Share />}
            {withSocial && <Follow />}
            {withSocial && <Contact />}
        </div>
    )
}

export default CSSModules(Sidebar, styles)
