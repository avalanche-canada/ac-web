import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Dropdown.css'

function K() {}

Option.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node]).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
}

function Option({value, onClick = K, active = false, children}) {
    function handleClick(event) {
        onClick(value)
    }

    return (
        <div styleName={active ? 'Option--Active' : 'Option'} onClick={handleClick}>
            {children}
        </div>
    )
}

export default CSSModules(Option, styles)
