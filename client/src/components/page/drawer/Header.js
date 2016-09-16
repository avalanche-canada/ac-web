import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import Sponsor from 'containers/Sponsor'
import styles from './Drawer.css'
import Subject from './Subject'

Header.propTypes = {
    subject: PropTypes.string,
    children: PropTypes.element,
}

function Header({subject, children}) {
    return (
        <div styleName='Header'>
            {subject &&
                <Subject>
                    {subject}
                </Subject>
            }
            {children}
        </div>
    )
}

export default CSSModules(Header, styles)
