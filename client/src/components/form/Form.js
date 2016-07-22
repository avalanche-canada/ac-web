import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Form.css'

Form.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
}

function Form({ children, ...props }) {
    return (
        <form styleName='Form' {...props}>
            {children}
        </form>
    )
}

export default CSSModules(Form, styles)
