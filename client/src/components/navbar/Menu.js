import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Navbar.css'

Menu.propTypes = {
    isOpened: PropTypes.bool,
    inline: PropTypes.bool,
}

function Menu({ isOpened = false, inline = false, children }) {
    let styleName = 'Menu'

    if (isOpened) {
        styleName += ' Menu--opened'
    }

    if (inline) {
        styleName += ' Menu--inline'
    }

    return (
        <div styleName={styleName}>
            {children}
        </div>
    )
}

export default CSSModules(Menu, styles, {allowMultiple: true})
