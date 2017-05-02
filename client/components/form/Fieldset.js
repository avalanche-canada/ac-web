import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Form.css'

Fieldset.propTypes = {
    children: PropTypes.node.isRequired,
}

function Fieldset({ children }) {
    return (
        <fieldset styleName="Fieldset">
            {children}
        </fieldset>
    )
}

export default CSSModules(Fieldset, styles)
