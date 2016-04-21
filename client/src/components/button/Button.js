import React, { PropTypes, DOM } from 'react'
import { compose, setPropTypes, setDisplayName, mapProps } from 'recompose'
import CSSModules from 'react-css-modules'
import styles from './Button.css'

export const PRIMARY = 'Primary'
export const SECONDARY = 'Secondary'

const { button } = DOM
const propTypes = {
    type: PropTypes.oneOf([PRIMARY, SECONDARY])
}

function propsMapper({ type = PRIMARY, ...props }) {
    return {
        ...props,
        styleName: type,
    }
}

export default compose(
    setDisplayName('Button'),
    setPropTypes(propTypes),
    mapProps(propsMapper)
)(CSSModules(button, styles))
