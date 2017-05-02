import React, { DOM } from 'react'
import PropTypes from 'prop-types'
import {
    compose,
    setPropTypes,
    setDisplayName,
    mapProps,
    defaultProps,
} from 'recompose'
import CSSModules from 'react-css-modules'
import styles from './Button.css'
import classNames from 'classnames'
import KIND, { ALL as KINDS } from './kinds'

const LEFT = 'LEFT'
const RIGHT = 'RIGHT'

export default compose(
    setDisplayName('Button'),
    setPropTypes({
        children: PropTypes.node,
        active: PropTypes.bool,
        shadow: PropTypes.bool,
        large: PropTypes.bool,
        transparent: PropTypes.bool,
        chevron: PropTypes.oneOf([LEFT, RIGHT, true]),
        kind: PropTypes.oneOf(Array.from(KINDS)),
        icon: PropTypes.node,
    }),
    defaultProps({
        kind: KIND,
        active: false,
        shadow: false,
        large: false,
        transparent: false,
    }),
    mapProps(
        ({
            icon,
            active,
            shadow,
            large,
            kind,
            transparent,
            chevron,
            ...props
        }) => {
            const styleName = classNames({
                [kind]: true,
                Active: active,
                Shadow: shadow,
                Large: large,
                Transparent: transparent,
                ChevronLeft: chevron === LEFT,
                ChevronRight: chevron === RIGHT,
                Chevron: chevron === true,
            })

            if (!icon) {
                return { ...props, styleName }
            }

            const { children } = props

            return {
                ...props,
                styleName: `${styleName} ${children ? '' : 'IconOnly'}`,
                children: (
                    <div styleName="IconContainer">
                        {icon}
                        {typeof children === 'string'
                            ? <span>{children}</span>
                            : children}
                    </div>
                ),
            }
        }
    ),
    CSSModules(styles, { allowMultiple: true })
)(DOM.button)
