import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Form.css'

Fieldset.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
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
