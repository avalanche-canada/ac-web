import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Close } from '~/components/button'
import styles from './Drawer.css'

DrawerClose.propTypes = {
    children: PropTypes.node,
}

function DrawerClose({ children, ...props }) {
    return (
        <Close styleName="Button--Close" {...props}>
            {children}
        </Close>
    )
}

export default CSSModules(DrawerClose, styles)
