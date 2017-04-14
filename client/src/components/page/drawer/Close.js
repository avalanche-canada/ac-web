import React from 'react'
import CSSModules from 'react-css-modules'
import {Close} from '~/components/button'
import styles from './Drawer.css'

function DrawerClose({children, ...props}) {
    return (
        <Close styleName='Button--Close' {...props}>
            {children}
        </Close>
    )
}

export default CSSModules(DrawerClose, styles)
