import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as Icons from 'components/icons'
import styles from './Pager.css'

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
                    <div>
                        <div className={styles.Title}>{children}</div>
                        <div className={styles.Subtitle}>{subtitle}</div>
                    </div>
                    {icon}
                </Link>
            )
        }
    }
}

export const Previous = withNavigation({
    defaultSubtitle: 'Previous',
    className: styles.Previous,
    icon: <Icons.Previous />,
})

export const Next = withNavigation({
    defaultSubtitle: 'Next',
    className: styles.Next,
    icon: <Icons.Next />,
})

export default function Pager({ children }) {
    return <nav className={styles.Container}>{children}</nav>
}
