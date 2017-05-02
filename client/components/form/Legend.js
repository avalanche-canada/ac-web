import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Form.css'

Legend.propTypes = {
    children: PropTypes.node.isRequired,
}

function Legend({ children }) {
    return (
        <legend styleName="Legend">
            {children}
        </legend>
    )
}

export default CSSModules(Legend, styles)
