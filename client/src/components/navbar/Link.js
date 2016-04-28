import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Navbar.css'

const isExternalRegExp = new RegExp('^http(s):\/\/')
function isExternal(to) {
    if (typeof to !== 'string') {
        return false
    }

    return isExternalRegExp.test(to)
}

Link.propTypes = {
    to: PropTypes.string.isRequired
}

function Link({ to, children, ...props }) {
    const target = isExternal(to) ? '_blank' : null
    const styleName = 'Link'
    
    return (
        <a href={to} {...{target, styleName}} {...props} >
            {children}
        </a>
    )
}

export default CSSModules(Link, styles)
