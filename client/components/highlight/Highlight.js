import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Close } from 'components/button'
import styles from './Highlight.css'
import noop from 'lodash/noop'

export const DANGER = 'danger'
export const WARNING = 'warning'
export const INFO = 'info'
export const SUCCESS = 'success'

const STYLE_NAMES = new Map([
    [DANGER, 'Danger'],
    [WARNING, 'Warning'],
    [INFO, 'Info'],
    [SUCCESS, 'Success'],
])

Highlight.propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.oneOf([DANGER, WARNING, INFO, SUCCESS]).isRequired,
    dismissable: PropTypes.bool,
    onDismiss: PropTypes.func,
}

function Highlight({
    style = WARNING,
    dismissable,
    onDismiss = noop,
    children,
}) {
    return (
        <div styleName={STYLE_NAMES.get(style)}>
            {children}
            {dismissable && <Close transparent onClick={onDismiss} />}
        </div>
    )
}

export default CSSModules(Highlight, styles)
