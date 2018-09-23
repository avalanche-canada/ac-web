import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import * as Icons from 'components/icons'
import Button from 'components/button'
import styles from './Pager.css'
import { WHITE } from 'constants/colors'

function withNavigation({ defaultSubtitle, icon, className }) {
    return class Navigation extends PureComponent {
        static propTypes = {
            children: PropTypes.node.isRequired,
            title: PropTypes.string,
            subtitle: PropTypes.string,
            to: PropTypes.string.isRequired,
        }
        static defaultProps = {
            subtitle: defaultSubtitle,
        }
        render() {
            const { title, children, subtitle, ...link } = this.props
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
}

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
