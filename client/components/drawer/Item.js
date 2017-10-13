import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Drawer.css'

Item.propTypes = {
    children: PropTypes.node.isRequired,
}

function Item({ children }) {
    return (
        <li styleName="Item">
            {children}
        </li>
    )
}

export default CSSModules(Item, styles)
