import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Sidebar.css'

Item.propTypes = {
    children: PropTypes.string.isRequired
}

function Item({ children }) {
    return (
        <section styleName='Item'>
            {children}
        </section>
    )
}

export default CSSModules(Item, styles)
