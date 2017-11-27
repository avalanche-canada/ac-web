import React, { Children, cloneElement } from 'react'
import PropTypes from 'prop-types'
import styles from './Form.css'

Control.propTypes = {
    children: PropTypes.node.isRequired,
    icon: PropTypes.node,
}

export default function Control({ icon = null, children, ...props }) {
    const withIcon = icon !== null

    return (
        <div className={styles.Control} {...props}>
            {Children.map(children, child => cloneElement(child, { withIcon }))}
            {withIcon && cloneElement(icon, { height: 40 })}
        </div>
    )
}
