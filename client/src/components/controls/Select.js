import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Controls.css'

Select.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
}

function Select({ children }) {
    return (
        <select styleName='Select'>
            {children}
        </select>
    )
}

export default CSSModules(Select, styles)
