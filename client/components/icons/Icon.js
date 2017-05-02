import React from 'react'
import PropTypes from 'prop-types'

// TODO: Rework all Icon system!!!

Icon.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    viewBox: PropTypes.string,
    fill: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
}

export default function Icon({
    children,
    height = 24,
    width = 24,
    viewBox = '0 0 24 24',
    fill = 'none',
    className,
}) {
    return (
        <svg {...{ height, width, viewBox, fill, className }}>
            {children}
        </svg>
    )
}
