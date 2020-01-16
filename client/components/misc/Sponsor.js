import React, { memo } from 'react'
import PropTypes from 'prop-types'
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

function Sponsor({ name, logo, url, label = 'Brought to you by', children }) {
    return (
        <a
            href={url}
            target={name}
            title={name}
            className={styles.Container}
            onClick={handleOutboundSponsorClick}>
            {label && <span className={styles.Label}>{label}</span>}
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

export default memo(Sponsor)
