import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Form.css'

Fieldset.propTypes = {
    children: PropTypes.node.isRequired,
    legend: PropTypes.string,
}

function Fieldset({ legend, children }) {
    return (
        <fieldset styleName='Fieldset'>
            {children}
        </fieldset>
    )
}

export default CSSModules(Fieldset, styles)
