import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './Shim.module.css'

Shim.propTypes = {
    children: PropTypes.node,
    top: PropTypes.bool,
    right: PropTypes.bool,
    bottom: PropTypes.bool,
    left: PropTypes.bool,
    vertical: PropTypes.bool,
    horizontal: PropTypes.bool,
    all: PropTypes.bool,
    as: PropTypes.string,
    className: PropTypes.string,
}

export default function Shim({
    children,
    as: As = 'div',
    className, // TODO Remove the property!!!
    ...values
}) {
    className = classnames(className, createClassNameFromValues(values))

    return <As className={className}>{children}</As>
}

function createClassNameFromValues(values) {
    return Object.keys(values)
        .filter(Boolean)
        .map(key => css[key])
}
