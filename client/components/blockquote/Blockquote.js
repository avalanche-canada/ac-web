import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Blockquote.css'

Blockquote.propTypes = {
    children: PropTypes.node.isRequired,
}

function Blockquote({ children }) {
    return (
        <blockquote styleName="Blockquote">
            {children}
        </blockquote>
    )
}

export default CSSModules(Blockquote, styles)
