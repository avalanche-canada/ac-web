import React from 'react'
import PropTypes from 'prop-types'
import styles from './Form.css'

Control.propTypes = {
    children: PropTypes.node.isRequired,
    horizontal: PropTypes.bool,
}

export default function Control({ children, horizontal, ...props }) {
    const name = horizontal ? 'Control--Horizontal' : 'Control'

    return (
        <div className={styles[name]} {...props}>
            {children}
        </div>
    )
}
