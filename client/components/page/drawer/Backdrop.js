import React from 'react'
import PropTypes from 'prop-types'
import styles from './Drawer.css'

Backdrop.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}

export default function Backdrop({ children, ...props }) {
    return (
        <div {...props} className={styles.Backdrop}>
            {children}
        </div>
    )
}
