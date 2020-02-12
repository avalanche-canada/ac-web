import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Link from './Link'
import classnames from 'classnames'
import css from './Navbar.css'

Item.propTypes = {
    title: PropTypes.node.isRequired,
    isActive: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node,
    to: PropTypes.string,
    id: PropTypes.string.isRequired,
}

function Item({ isActive = false, title, onClick, children, to, id }) {
    const className = classnames({
        [css.Item]: !isActive,
        [css['Item--isActive']]: isActive,
    })

    return (
        <li id={id} className={className}>
            <Link to={to} onClick={onClick}>
                {title}
            </Link>
            {children}
        </li>
    )
}

export default memo(Item, (prev, next) => prev.isActive === next.isActive)
