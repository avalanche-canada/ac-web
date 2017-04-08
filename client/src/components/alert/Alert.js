import React from 'react'
import PropTypes from 'prop-types'
import {compose, setPropTypes, mapProps} from 'recompose'
import CSSModules from 'react-css-modules'
import styles from './Alert.css'

export const DANGER = 'DANGER'
export const INFO = 'INFO'
export const WARNING = 'WARNING'
export const SUCCESS = 'SUCCESS'

const styleNames = new Map([
    [DANGER, 'Danger'],
    [INFO, 'Info'],
    [WARNING, 'Warning'],
    [SUCCESS, 'Success'],
])

Alert.propTypes = {
    type: PropTypes.oneOf([DANGER, INFO, WARNING, SUCCESS]).isRequired,
    children: PropTypes.node,
}

function Alert({type = DANGER, children, ...props}) {
    return (
        <div styleName={styleNames.get(type)} {...props}>
            {children}
        </div>
    )
}

export default CSSModules(Alert, styles)
