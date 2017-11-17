import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
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
        style: PropTypes.object,
    }
    static defaultProps = {
        to: '#',
    }
    render() {
        const { to, children, ...props } = this.props
        const target = isExternal(to) ? to : null

        return (
            <Link target={target} to={to} className={styles.Link} {...props}>
                {children}
            </Link>
        )
    }
}
