import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from './Pager.css'

export default function Pager({ children }) {
    return <div className={styles.Container}>{children}</div>
}

export class Next extends PureComponent {
    static propTypes = {
        title: PropTypes.string.isRequired,
        subtitle: PropTypes.string,
        to: PropTypes.string.isRequired,
    }

    render() {
        const { title, subtitle = 'Next', ...link } = this.props

        return (
            <div>
                <div>
                    {subtitle}
                    {title}
                </div>
                <Link {...link} title={title} />
            </div>
        )
    }
}

export function Previous() {}
