import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Controls.css'

Input.propTypes = {
    withIcon: PropTypes.bool,
}

function Input({ withIcon = false, ...props }) {
    return (
        <input {...props} styleName={withIcon ? 'Input--WithIcon' : 'Input'} />
    )
}

export default CSSModules(Input, styles)
