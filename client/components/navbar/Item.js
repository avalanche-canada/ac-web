import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Link from './Link'
import styles from './Navbar.css'
import classnames from 'classnames/bind'

Item.propTypes = {
    title: PropTypes.node.isRequired,
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
    noWrap: PropTypes.bool,
    children: PropTypes.node,
    to: PropTypes.string,
}

function Item({
    isActive = false,
    title,
    onClick,
    noWrap = false,
    children,
    to,
}) {
    const className = classNames({
        Item: !isActive,
        'Item--isActive': isActive,
        'Item--NoWrap': noWrap,
    })

    return (
        <li className={className}>
            <Link to={to} onClick={onClick}>
                {title}
            </Link>
            {children}
        </li>
    )
}

export default memo(Item, (prev, next) => prev.isActive === next.isActive)

const classNames = classnames.bind(styles)
