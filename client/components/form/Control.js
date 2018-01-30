import React, { Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import styles from './Form.css'

Control.propTypes = {
    children: PropTypes.node.isRequired,
    icon: PropTypes.node,
    horizontal: PropTypes.bool,
}

export default function Control({
    icon = null,
    children,
    horizontal,
    ...props
}) {
    const withIcon = icon !== null
    const name = horizontal ? 'Control--Horizontal' : 'Control'

    return (
        <div className={styles[name]} {...props}>
            {Children.map(children, child => cloneElement(child, { withIcon }))}
            {withIcon && cloneElement(icon, { height: 40 })}
        </div>
    )
}
