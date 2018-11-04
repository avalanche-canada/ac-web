import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import * as Icons from 'components/icons'
import Button from 'components/button'
import styles from './Pager.css'
import { WHITE } from 'constants/colors'

export const Previous = withNavigation({
    defaultSubtitle: 'Previous',
    className: styles.Previous,
    icon: <Icons.ChevronLeft color={WHITE} width={32} height={32} />,
})

export const Next = withNavigation({
    defaultSubtitle: 'Next',
    className: styles.Next,
    icon: <Icons.ChevronRight color={WHITE} width={32} height={32} />,
})

export default function Pager({ children }) {
    return <nav className={styles.Container}>{children}</nav>
}

function withNavigation({ defaultSubtitle, icon, className }) {
    return memo(function Navigation({
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
    })
}
