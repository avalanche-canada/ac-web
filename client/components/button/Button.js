import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import KIND, { ALL as KINDS } from './kinds'
import styles from './Button.css'

const LEFT = 'LEFT'
const RIGHT = 'RIGHT'

export default class Button extends PureComponent {
    static propTypes = {
        children: PropTypes.node,
        active: PropTypes.bool,
        shadow: PropTypes.bool,
        large: PropTypes.bool,
        transparent: PropTypes.bool,
        chevron: PropTypes.oneOf([LEFT, RIGHT, true]),
        kind: PropTypes.oneOf(Array.from(KINDS)),
        icon: PropTypes.node,
        className: PropTypes.string,
    }
    static defaultProps = {
        kind: KIND,
        active: false,
        shadow: false,
        large: false,
        transparent: false,
    }
    constructor(props) {
        super(props)
        this.classNames = classnames.bind(styles)
    }
    get className() {
        const { chevron, className } = this.props

        return this.classNames(className, this.props.kind, {
            Active: this.props.active,
            Shadow: this.props.shadow,
            Large: this.props.large,
            Transparent: this.props.transparent,
            ChevronLeft: chevron === LEFT,
            ChevronRight: chevron === RIGHT,
            Chevron: chevron === true,
            IconOnly: !this.props.children,
        })
    }
    render() {
        const {
            kind,
            active,
            shadow,
            large,
            transparent,
            icon,
            chevron,
            children,
            ...rest
        } = this.props

        return (
            <button {...rest} className={this.className}>
                {icon ? (
                    <div className={styles.IconContainer}>
                        {icon}
                        {typeof children === 'string' ? (
                            <span>{children}</span>
                        ) : (
                            children
                        )}
                    </div>
                ) : (
                    children
                )}
            </button>
        )
    }
}
