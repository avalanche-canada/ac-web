import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Dropdown.css'

Holder.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

function Holder({ value, placeholder }) {
    return (
        <span styleName={value ? 'Valueholder' : 'Placeholder'}>
            {value || placeholder}
        </span>
    )
}

export default CSSModules(Holder, styles)
