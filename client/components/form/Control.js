import React, { Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Form.css'

Control.propTypes = {
    children: PropTypes.node.isRequired,
    icon: PropTypes.node,
}

// TODO: Clean up this ugly code! Why the icon?!?!?!!?

function Control({ icon = null, children, ...props }) {
    const withIcon = icon !== null

    return (
        <div styleName="Control" {...props}>
            {Children.map(children, child => cloneElement(child, { withIcon }))}
            {withIcon && cloneElement(icon, { height: 40 })}
        </div>
    )
}

export default CSSModules(Control, styles)
