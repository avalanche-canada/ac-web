import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import menu from './menu.json'
import styles from './Tutorial.css'

Tree.propTypes = {
    currentPage: PropTypes.number.isRequired,
}

export default function Tree({ currentPage }) {
    return (
        <ul>
            {menu.map(item => (
                <MenuItem key={item.slug} currentPage={currentPage} {...item} />
            ))}
        </ul>
    )
}

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    currentPage: PropTypes.string,
}

function MenuItem({ title, slug, children, currentPage }) {
    const showChildren = currentPage.startsWith(slug)
    const showElipsis = !showChildren && children.length > 0

    return (
        <li>
            <Link to={slug} getProps={isPartiallyActive}>
                {title}
                {showElipsis && '...'}
            </Link>
            {showChildren && (
                <ul>
                    {children.map(child => (
                        <MenuItem
                            key={child.slug}
                            currentPage={currentPage}
                            {...child}
                        />
                    ))}
                </ul>
            )}
        </li>
    )
}

// Utils
function isPartiallyActive({ isPartiallyCurrent }) {
    return isPartiallyCurrent ? { className: styles.ActiveMenuItem } : null
}
