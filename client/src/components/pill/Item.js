import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Pill.css'

function noop() {}

Item.propTypes = {
    children: PropTypes.node.isRequired,
    active: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
}

function Item({active = false, onClick = noop, children}) {
    return (
        <li styleName={active ? 'Item--Active' :'Item'} onClick={onClick} >
            {children}
        </li>
    )
}

export default CSSModules(Item, styles)
