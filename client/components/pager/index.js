import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { ChevronLeft, ChevronRight } from 'components/icons'
import Button from 'components/button'
import styles from './Pager.css'
import { WHITE } from 'constants/colors'
import { FormattedMessage } from 'react-intl'

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

export function Previous({
    subtitle = (
        <FormattedMessage
            description="Component pager/Previous"
            defaultMessage="Previous"
        />
    ),
    ...props
}) {
    return (
        <Navigation
            {...props}
            subtitle={subtitle}
            className={styles.Previous}
            icon={<ChevronLeft color={WHITE} width={32} height={32} />}
        />
    )
}

export function Next({
    subtitle = (
        <FormattedMessage
            description="Component pager/Next"
            defaultMessage="Next"
        />
    ),
    ...props
}) {
    return (
        <Navigation
            {...props}
            subtitle={subtitle}
            className={styles.Next}
            icon={<ChevronRight color={WHITE} width={32} height={32} />}
        />
    )
}

// Base component
function Navigation({ title, children, subtitle, className, icon, ...link }) {
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
