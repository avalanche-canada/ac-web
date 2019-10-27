import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Link from './Link'
import classnames from 'classnames'
import css from './Navbar.css'

Item.propTypes = {
    title: PropTypes.node.isRequired,
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
    // TODO Not sure is this still valid!
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
    const className = classnames({
        [css.Item]: !isActive,
        [css['Item--isActive']]: isActive,
        [css['Item--NoWrap']]: noWrap,
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
