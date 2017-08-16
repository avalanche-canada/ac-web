import React from 'react'
import PropTypes from 'prop-types'
import CSSModule from 'react-css-modules'
import styles from './Credit.css'

Credit.propTypes = {
    children: PropTypes.string.isRequired,
    compact: PropTypes.bool,
}

function Credit({ children, compact = false }) {
    return (
        <span
            data-label="Credit"
            styleName={compact ? 'Credit--Compact' : 'Credit'}>
            {children}
        </span>
    )
}

export default CSSModule(Credit, styles)
