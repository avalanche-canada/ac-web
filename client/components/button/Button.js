import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import KIND, { ALL as KINDS } from './kinds'
import css from './Button.css'

const LEFT = 'LEFT'
const RIGHT = 'RIGHT'

Button.propTypes = {
    children: PropTypes.node,
    active: PropTypes.bool,
    shadow: PropTypes.bool,
    large: PropTypes.bool,
    kind: PropTypes.oneOf(Array.from(KINDS)),
    chevron: PropTypes.oneOf([LEFT, RIGHT, true]),
    className: PropTypes.string,
}

function Button({
    kind = KIND,
    active = false,
    shadow = false,
    large = false,
    chevron,
    children,
    ...props
}) {
    const className = classnames(props.className, {
        [css[kind]]: true,
        [css.Active]: active,
        [css.Shadow]: shadow,
        [css.Large]: large,
        [css.ChevronLeft]: chevron === LEFT,
        [css.ChevronRight]: chevron === RIGHT,
        [css.Chevron]: chevron === true,
    })

    return (
        <button type="button" {...props} className={className}>
            {children}
        </button>
    )
}

export default memo(Button)
