import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import styles from './Navbar.css'

const isExternalRegExp = new RegExp('^(https|http)://')
function isExternal(to) {
    if (typeof to !== 'string') {
        return false
    }

    return isExternalRegExp.test(to)
}

export default class Anchor extends PureComponent {
    static propTypes = {
        to: PropTypes.string,
        onClick: PropTypes.func,
        children: PropTypes.string,
        title: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.object,
    }
    static defaultProps = {
        to: '#',
    }
    get target() {
        const { to } = this.props

        return isExternal(to) ? to : null
    }
    render() {
        const { to, children, className, ...props } = this.props

        return (
            <Link
                to={to}
                target={this.target}
                className={classnames(styles.Link, this.props.className)}
                {...props}>
                {children}
            </Link>
        )
    }
}
