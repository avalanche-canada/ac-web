import React, { isValidElement } from 'react'
import PropTypes from 'prop-types'
import styles from './OptionSet.css'

Option.propTypes = {
    children: PropTypes.node.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    active: PropTypes.bool,
    onClick: PropTypes.func,
}

export default function Option({
    children,
    value,
    active,
    onClick = () => {},
}) {
    const title = isValidElement(children) ? value : children
    const name = active ? 'Option--Active' : 'Option'
    function handleMouseDown() {
        onClick(value)
    }

    return (
        <div
            title={title}
            className={styles[name]}
            onMouseDown={handleMouseDown}>
            {children}
        </div>
    )
}
