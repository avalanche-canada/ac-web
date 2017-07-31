import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Form.css'

Form.propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.object,
}

function Form({ children, style }) {
    return (
        <form styleName="Form" style={style}>
            {children}
        </form>
    )
}

export default CSSModules(Form, styles)
