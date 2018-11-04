import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styles from './Sponsor.css'
import { handleOutboundSponsorClick } from 'services/analytics'
import { forceHttps } from 'utils/url'

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
            onClick={handleOutboundSponsorClick}>
            <dl className={styles.Container}>
                {label && <dt className={styles.Label}>{label}</dt>}
                {logo && (
                    <dd className={styles.Logo}>
                        <img src={forceHttps(logo)} alt={name} title={name} />
                    </dd>
                )}
                {children}
            </dl>
        </a>
    )
}

export default memo(Sponsor)
