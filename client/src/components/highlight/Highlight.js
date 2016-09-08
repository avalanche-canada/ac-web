import React, {PropTypes} from 'react'
import {compose, setPropTypes, withProps} from 'recompose'
import CSSModules from 'react-css-modules'
import capitalize from 'lodash/capitalize'
import {Close} from 'components/button'
import styles from './Highlight.css'

function K() {}

Highlight.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    style: PropTypes.oneOf(['danger', 'warning', 'info']).isRequired,
    dismissable: PropTypes.bool,
    onDismiss: PropTypes.func,
}

export default function Highlight({style, dismissable, onDismiss = K, children}) {
    return (
        <div styleName={`Highlight--${capitalize(style)}`}>
            {children}
            {dismissable && <Close onClick={onDismiss} />}
        </div>
    )
}
