import React from 'react'
import PropTypes from 'prop-types'
import styles from './Form.css'

ControlSet.propTypes = {
    children: PropTypes.node.isRequired,
    horizontal: PropTypes.bool,
}

export default function ControlSet({ horizontal, children }) {
    const className = horizontal ? 'ControlSet--Horizontal' : 'ControlSet'

    return <div className={styles[className]}>{children}</div>
}
