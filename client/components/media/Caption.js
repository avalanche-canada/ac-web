import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Media.css'

Caption.propTypes = {
    children: PropTypes.node.isRequired,
}

function Caption({ children }) {
    return (
        <figcaption styleName="Caption">
            {children}
        </figcaption>
    )
}

export default CSSModules(Caption, styles)
