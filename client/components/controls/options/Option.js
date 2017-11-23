import React from 'react'
import PropTypes from 'prop-types'
import styles from './OptionSet.css'
import noop from 'lodash/noop'

Option.propTypes = {
    children: PropTypes.node.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    active: PropTypes.bool,
    onClick: PropTypes.func,
}

export default function Option({
    value,
    onClick = noop,
    active = false,
    children,
}) {
    const className = active ? 'Option--Active' : 'Option'
    function handleClick() {
        onClick(value)
    }

    return (
        <div
            title={children}
            className={styles[className]}
            onMouseDown={handleClick}>
            {children}
        </div>
    )
}
