import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Link from './Link'
import styles from './Navbar.css'
import classnames from 'classnames/bind'

export default class Item extends PureComponent {
    static propTypes = {
        title: PropTypes.node.isRequired,
        isActive: PropTypes.bool,
        onClick: PropTypes.func,
        noWrap: PropTypes.bool,
        children: PropTypes.node,
        to: PropTypes.string,
    }
    static defaultProps = {
        isActive: false,
        noWrap: false,
    }
    constructor(props) {
        super(props)

        this.styles = classnames.bind(styles)
    }
    render() {
        const { isActive, title, onClick, noWrap, children, to } = this.props
        const classNames = this.styles({
            Item: !isActive,
            'Item--isActive': isActive,
            'Item--NoWrap': noWrap,
        })

        return (
            <li className={classNames}>
                <Link to={to} onClick={onClick}>
                    {title}
                </Link>
                {children}
            </li>
        )
    }
}
