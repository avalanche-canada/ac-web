import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Description.css'

Element.propTypes = {
    children: PropTypes.node.isRequired,
}

function Element({ children }) {
    return (
        <dd styleName='Element'>
            {children}
        </dd>
    )
}

export default CSSModules(Element, styles)
