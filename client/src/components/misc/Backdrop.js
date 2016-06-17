import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Backdrop.css'

function K() {}

Backdrop.propTypes = {
    onClick: PropTypes.func.isRequired
}

function Backdrop({ onClick = K }) {
    return (
        <div styleName='Backdrop' onClick={onClick}></div>
    )
}

export default CSSModules(Backdrop, styles)
