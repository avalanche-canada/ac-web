import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Flipper.css'

Flipper.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element)
}

function Flipper({children}) {
    return (
        <div styleName='Container'>
            {children}
        </div>
    )
}

export default CSSModules(Flipper, styles)
