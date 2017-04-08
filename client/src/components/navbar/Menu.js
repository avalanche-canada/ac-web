import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Navbar.css'

Menu.propTypes = {
    isOpened: PropTypes.bool,
    children: PropTypes.node.isRequired,
}

function Menu({isOpened, children}) {
    if (!isOpened) {
        return null
    }

    return (
        <div styleName='Menu'>
            {children}
        </div>
    )
}

export default CSSModules(Menu, styles)
