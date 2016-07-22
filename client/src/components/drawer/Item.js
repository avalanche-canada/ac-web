import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Drawer.css'

function Item({ children }) {
    return (
        <li styleName='Item'>
            {children}
        </li>
    )
}

export default CSSModules(Item, styles)
