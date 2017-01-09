import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import capitalize from 'lodash/capitalize'
import {Close} from 'components/button'
import styles from './Highlight.css'

function noop() {}

Highlight.propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.oneOf(['danger', 'warning', 'info', 'success']).isRequired,
    dismissable: PropTypes.bool,
    onDismiss: PropTypes.func,
}

function Highlight({style = 'warning', dismissable, onDismiss = noop, children}) {
    return (
        <div styleName={`Highlight--${capitalize(style)}`}>
            {children}
            {dismissable && <Close onClick={onDismiss} />}
        </div>
    )
}

export default CSSModules(Highlight, styles)
