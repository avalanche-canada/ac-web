import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { forceHttps } from 'utils/url'
import { handleOutboundSponsorClick } from 'services/analytics'
import styles from './Sponsor.css'

Sponsor.propTypes = {
    name: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    label: PropTypes.string,
    children: PropTypes.node,
}

export default function Sponsor({ name, logo, url, label, children }) {
    return (
        <a
            href={url}
            target={name}
            title={name}
            className={styles.Container}
            onClick={handleOutboundSponsorClick}>
            {label === null || (
                <span className={styles.Label}>
                    <FormattedMessage defaultMessage="Brought to you by" />
                </span>
            )}
            {logo ? (
                <img
                    src={forceHttps(logo)}
                    alt={name}
                    title={name}
                    className={styles.Logo}
                />
            ) : (
                children
            )}
        </a>
    )
}
