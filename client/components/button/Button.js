import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import KIND, { ALL as KINDS } from './kinds'
import styles from './Button.css'

const LEFT = 'LEFT'
const RIGHT = 'RIGHT'
const classNames = classnames.bind(styles)

Button.propTypes = {
    children: PropTypes.node,
    active: PropTypes.bool,
    shadow: PropTypes.bool,
    large: PropTypes.bool,
    transparent: PropTypes.bool,
    kind: PropTypes.oneOf(Array.from(KINDS)),
    chevron: PropTypes.oneOf([LEFT, RIGHT, true]),
    className: PropTypes.string,
}

function Button({
    kind = KIND,
    active = false,
    shadow = false,
    large = false,
    transparent = false,
    chevron,
    children,
    ...props
}) {
    const className = classNames(props.className, kind, {
        Active: active,
        Shadow: shadow,
        Large: large,
        Transparent: transparent,
        ChevronLeft: chevron === LEFT,
        ChevronRight: chevron === RIGHT,
        Chevron: chevron === true,
    })

    return (
        <button {...props} className={className}>
            {children}
        </button>
    )
}

export default memo(Button)
