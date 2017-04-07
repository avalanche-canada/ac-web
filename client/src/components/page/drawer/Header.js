import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Drawer.css'
import Subject from './Subject'

Header.propTypes = {
    subject: PropTypes.string,
    children: PropTypes.node,
}

function Header({subject, children}) {
    return (
        <header styleName='Header'>
            {subject &&
                <Subject>
                    {subject}
                </Subject>
            }
            {children}
        </header>
    )
}

export default CSSModules(Header, styles)
