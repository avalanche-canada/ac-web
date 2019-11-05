import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { ChevronLeft, ChevronRight } from 'components/icons'
import Button from 'components/button'
import styles from './Pager.css'
import { WHITE } from 'constants/colors'

Pager.propTypes = {
    children: PropTypes.element,
}

export default function Pager({ children, ...props }) {
    return (
        <nav {...props} className={styles.Container}>
            {children}
        </nav>
    )
}

export const Previous = withNavigation(
    'Previous',
    styles.Previous,
    <ChevronLeft color={WHITE} width={32} height={32} />
)

export const Next = withNavigation(
    'Next',
    styles.Next,
    <ChevronRight color={WHITE} width={32} height={32} />
)

// Utils, HOC
function withNavigation(defaultSubtitle, className, icon) {
    return function Navigation({
        title,
        children,
        subtitle = defaultSubtitle,
        ...link
    }) {
        let linkTitle = title

        if (!linkTitle && typeof children === 'string') {
            linkTitle = children
        }

        return (
            <Link {...link} title={linkTitle} className={className}>
                <div className={styles.TextSection}>
                    <div className={styles.Subtitle}>{subtitle}</div>
                    <div className={styles.Title}>{children}</div>
                </div>
                <Button className={styles.Icon}>{icon}</Button>
            </Link>
        )
    }
}
