import React from 'react'
import PropTypes from 'prop-types'
import styles from './Sponsor.module.css'
import { handleOutboundSponsorClick } from 'services/analytics'

Item.propTypes = {
    src: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}

export function Item({ src, url, title = url }) {
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

export function ItemSet({ children, ...props }) {
    return (
        <div {...props} className={styles.ItemSet}>
            {children}
        </div>
    )
}
