import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Drawer.css'
import {LEFT, RIGHT} from './Drawer'
import Close from './Close'

Header.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    onCloseClick: PropTypes.bool,
}

function Header({ onCloseClick, children }) {
    return (
        <div styleName='Header'>
            {onCloseClick &&
                <div styleName='Close'>
                    <Close onClick={onCloseClick} />
                </div>
            }
            {children}
        </div>
    )
}

export default CSSModules(Header, styles)
