import React, { PureComponent, cloneElement, Children } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'
import styles from './Tabs.css'

export default class HeaderSet extends PureComponent {
    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.element).isRequired,
        activeIndex: PropTypes.number,
        onActiveIndexChange: PropTypes.func,
    }
    cloneHeader = (header, index) =>
        cloneElement(header, {
            isActive: index === this.props.activeIndex,
            onActivate: () => {
                const { disabled } = header.props

                if (disabled) {
                    return
                }

                this.props.onActiveIndexChange(index)
            },
        })
    render() {
        return (
            <div className={styles.HeaderSet}>
                {Children.map(this.props.children, this.cloneHeader)}
            </div>
        )
    }
}

export class Header extends PureComponent {
    static propTypes = {
        isActive: PropTypes.bool,
        disabled: PropTypes.bool,
        arrow: PropTypes.bool,
        onActivate: PropTypes.func,
        style: PropTypes.object,
        children: PropTypes.node.isRequired,
    }
    constructor(props) {
        super(props)

        this.styles = classnames.bind(styles)
    }
    render() {
        const {
            isActive,
            disabled,
            arrow,
            onActivate,
            children,
            style,
        } = this.props
        const classNames = this.styles({
            Header: true,
            'Header--Arrow': arrow,
            'Header--isActive': isActive,
            'Header--Disabled': disabled,
        })

        return (
            <div className={classNames} style={style} onClick={onActivate}>
                {children}
            </div>
        )
    }
}

ColoredHeader.propTypes = {
    color: PropTypes.string,
    isActive: PropTypes.bool,
    disabled: PropTypes.bool,
    arrow: PropTypes.bool,
    onActivate: PropTypes.func,
    style: PropTypes.object,
    children: PropTypes.node.isRequired,
}

export function ColoredHeader({ color, ...props }) {
    const { disabled, isActive } = props
    const style = color && {
        backgroundColor: disabled ? null : isActive ? color : null,
        color: disabled ? null : isActive ? 'white' : null,
        borderBottomColor: color,
    }

    return <Header {...props} style={style} />
}
