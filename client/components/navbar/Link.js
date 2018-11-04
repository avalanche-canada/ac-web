import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import classnames from 'classnames'
import { isExternal } from 'utils/url'
import styles from './Navbar.css'

Anchor.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    title: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
}

function Anchor({ to = '#', className, children, ...props }) {
    props.className = classnames(styles.Link, className)

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

export default memo(Anchor)
