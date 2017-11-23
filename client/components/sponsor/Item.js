import React from 'react'
import PropTypes from 'prop-types'
import styles from './Sponsor.css'
import { handleOutboundSponsorClick } from 'services/analytics'

Item.propTypes = {
    src: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}

export default function Item({ src, url, title = url }) {
    return (
        <a
            className={styles.Item}
            href={url}
            target="_blank"
            title={title}
            onClick={handleOutboundSponsorClick}>
            <img className={styles.Logo} src={src} alt={title} />
        </a>
    )
}
