import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from './Sponsor.css'
import { handleOutboundSponsorClick } from 'services/analytics'

export default class Sponsor extends PureComponent {
    static propTypes = {
        name: PropTypes.string.isRequired,
        logo: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        label: PropTypes.string,
        children: PropTypes.node,
    }
    static defaultProps = {
        label: 'Brought to you by',
    }
    render() {
        const { name, logo, url, label, children } = this.props

        return (
            <a
                href={url}
                target={name}
                title={name}
                onClick={handleOutboundSponsorClick}>
                <dl className={styles.Container}>
                    {label && <dt className={styles.Label}>{label}</dt>}
                    {logo && (
                        <dd className={styles.Logo}>
                            <img src={logo} alt={name} title={name} />
                        </dd>
                    )}
                    {children}
                </dl>
            </a>
        )
    }
}
