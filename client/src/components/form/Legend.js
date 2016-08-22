import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Form.css'

Legend.propTypes = {
    children: PropTypes.node.isRequired,
}

function Legend({children}) {
    return (
        <legend styleName='Legend'>
            {children}
        </legend>
    )
}

export default CSSModules(Legend, styles)
