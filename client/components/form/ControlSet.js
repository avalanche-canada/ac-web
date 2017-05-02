import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Form.css'

ControlSet.propTypes = {
    children: PropTypes.node.isRequired,
    horizontal: PropTypes.bool,
}

function ControlSet({ horizontal = false, children }) {
    return (
        <div styleName={horizontal ? 'ControlSet--Horizontal' : 'ControlSet'}>
            {children}
        </div>
    )
}

export default CSSModules(ControlSet, styles)
