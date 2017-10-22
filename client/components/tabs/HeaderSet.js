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
        children: PropTypes.node.isRequired,
        isActive: PropTypes.bool,
        disabled: PropTypes.bool,
        onActivate: PropTypes.func,
    }
    constructor(props) {
        super(props)

        this.styles = classnames.bind(styles)
    }
    render() {
        const { isActive, disabled, onActivate, children } = this.props
        const classNames = this.styles({
            Header: true,
            'Header--isActive': isActive,
            'Header--Disabled': disabled,
        })

        return (
            <div className={classNames} onClick={onActivate}>
                {children}
            </div>
        )
    }
}
