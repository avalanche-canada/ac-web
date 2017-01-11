import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './OptionSet.css'
import noop from 'lodash/noop'

Option.propTypes = {
    children: PropTypes.node.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    active: PropTypes.bool,
    onClick: PropTypes.func,
}

function Option({value, onClick = noop, active = false, children}) {
    const styleName = active ? 'Option--Active' : 'Option'
    function handleClick(event) {
        onClick(value)
    }

    return (
        <div title={children} styleName={styleName} onMouseDown={handleClick}>
            {children}
        </div>
    )
}

export default CSSModules(Option, styles)
