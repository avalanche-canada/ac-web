import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Tag.css'

Tag.propTypes = {
    children: PropTypes.node.isRequired,
}

function Tag({ children }) {
    return (
        <li styleName="Item">
            {children}
        </li>
    )
}

export default CSSModules(Tag, styles)
