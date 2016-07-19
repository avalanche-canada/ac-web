import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Drawer.css'
import Subject from './Subject'

Header.propTypes = {
    subject: PropTypes.string.isRequired,
    children: PropTypes.element,
    sponsor: PropTypes.object,
}

function Header({subject, sponsor, children}) {
    return (
        <div styleName='Header'>
            <Subject>
                {subject}
            </Subject>
            {children}
        </div>
    )
}

export default CSSModules(Header, styles)
