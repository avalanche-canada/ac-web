import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import KIND, { ALL as KINDS } from './kinds'
import styles from './Button.css'

const LEFT = 'LEFT'
const RIGHT = 'RIGHT'
const classNames = classnames.bind(styles)

export default class Button extends PureComponent {
    static propTypes = {
        children: PropTypes.node,
        active: PropTypes.bool,
        shadow: PropTypes.bool,
        large: PropTypes.bool,
        transparent: PropTypes.bool,
        kind: PropTypes.oneOf(Array.from(KINDS)),
        chevron: PropTypes.oneOf([LEFT, RIGHT, true]),
        className: PropTypes.string,
    }
    static defaultProps = {
        kind: KIND,
        active: false,
        shadow: false,
        large: false,
        transparent: false,
    }
    render() {
        const {
            kind,
            active,
            shadow,
            large,
            transparent,
            chevron,
            children,
            ...props
        } = this.props
        const className = classNames(this.props.className, kind, {
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
}
