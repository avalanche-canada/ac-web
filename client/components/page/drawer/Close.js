import React from 'react'
import PropTypes from 'prop-types'
import { Close } from 'components/button'
import styles from './Drawer.css'

DrawerClose.propTypes = {
    children: PropTypes.node,
}

export default function DrawerClose({ children, ...rest }) {
    return (
        <Close className={styles['Button--Close']} {...rest}>
            {children}
        </Close>
    )
}
