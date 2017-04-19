import React from 'react'
import PropTypes from 'prop-types'
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
