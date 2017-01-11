import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Backdrop.css'
import noop from 'lodash/noop'

Backdrop.propTypes = {
    onClick: PropTypes.func.isRequired
}

function Backdrop({onClick = noop}) {
    return (
        <div styleName='Backdrop' onClick={onClick}></div>
    )
}

export default CSSModules(Backdrop, styles)
