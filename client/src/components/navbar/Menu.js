import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Navbar.css'

Menu.propTypes = {
    isOpened: PropTypes.bool,
    inline: PropTypes.bool,
}

function Menu({ isOpened = false, inline = false, children }) {
    const styleNames = ['Menu']

    if (isOpened) {
        styleNames.push('Menu--opened')
    }

    if (inline) {
        styleNames.push('Menu--inline')
    }

    return (
        <div styleName={styleNames.join(' ')}>
            {children}
        </div>
    )
}

export default CSSModules(Menu, styles, {allowMultiple: true})
