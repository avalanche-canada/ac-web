import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Dropdown.css'

function K() {}

Option.propTypes = {
    children: PropTypes.node.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
}

function Option({value, onClick = K, active = false, children}) {
    const styleName = active ? 'Option--Active' : 'Option'
    function handleClick(event) {
        onClick(value)
    }

    return (
        <div title={children} styleName={styleName} onClick={handleClick}>
            {children}
        </div>
    )
}

export default CSSModules(Option, styles)
