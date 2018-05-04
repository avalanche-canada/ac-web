import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import menu from './menu.json'
import styles from './ates.css'

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    currentPage: PropTypes.number,
}

function MenuItem({ title, slug, children, currentPage }) {
    const showChildren = currentPage.startsWith(slug)
    const showElipsis = !showChildren && children.length > 0

    return (
        <li>
            <NavLink
                exact
                activeClassName={styles.ActiveMenuItem}
                to={`/tutorial/${slug}`}>
                {title}
                {showElipsis && '...'}
            </NavLink>
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
