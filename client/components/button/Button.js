import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Button.css'
import classNames from 'classnames'
import KIND, { ALL as KINDS } from './kinds'

const LEFT = 'LEFT'
const RIGHT = 'RIGHT'

Button.propTypes = {
    children: PropTypes.node,
    active: PropTypes.bool,
    shadow: PropTypes.bool,
    large: PropTypes.bool,
    transparent: PropTypes.bool,
    chevron: PropTypes.oneOf([LEFT, RIGHT, true]),
    kind: PropTypes.oneOf(Array.from(KINDS)),
    icon: PropTypes.node,
}

function Button({
    kind = KIND,
    active = false,
    shadow = false,
    large = false,
    transparent = false,
    icon,
    chevron,
    children,
    ...rest
}) {
    const styleName = classNames({
        [kind]: true,
        Active: active,
        Shadow: shadow,
        Large: large,
        Transparent: transparent,
        ChevronLeft: chevron === LEFT,
        ChevronRight: chevron === RIGHT,
        Chevron: chevron === true,
        IconOnly: !children,
    })

    return (
        <button styleName={styleName} {...rest}>
            {icon
                ? <div styleName="IconContainer">
                      {icon}
                      {typeof children === 'string'
                          ? <span>
                                {children}
                            </span>
                          : children}
                  </div>
                : children}
        </button>
    )
}

export default CSSModules(Button, styles, { allowMultiple: true })
