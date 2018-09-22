import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import classnames from 'classnames'
import { isExternal } from 'utils/url'
import styles from './Navbar.css'

export default class Anchor extends PureComponent {
    static propTypes = {
        to: PropTypes.string.isRequired,
        children: PropTypes.string.isRequired,
        onClick: PropTypes.func,
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
        const { to, children, ...props } = this.props

        props.className = classnames(styles.Link, this.props.className)

        if (isExternal(to)) {
            return (
                <a href={to} target={children} {...props}>
                    {children}
                </a>
            )
        }

        return (
            <Link to={to} {...props}>
                {children}
            </Link>
        )
    }
}
