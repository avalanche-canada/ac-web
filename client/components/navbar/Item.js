import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from './Navbar.css'
import classnames from 'classnames/bind'
import noop from 'lodash/noop'

export default class Item extends PureComponent {
    static propTypes = {
        title: PropTypes.node.isRequired,
        isActive: PropTypes.bool,
        onClick: PropTypes.func,
        noWrap: PropTypes.bool,
        children: PropTypes.node,
    }
    static defaultProps = {
        isActive: false,
        onClick: noop,
        noWrap: false,
    }
    constructor(props) {
        super(props)

        this.styles = classnames.bind(styles)
    }
    render() {
        const { isActive, title, onClick, noWrap, children } = this.props
        const classNames = this.styles({
            Item: !isActive,
            'Item--isActive': isActive,
            'Item--NoWrap': noWrap,
        })

        return (
            <li className={classNames}>
                <a href="#" onClick={onClick}>
                    <span>{title}</span>
                </a>
                {children}
            </li>
        )
    }
}
