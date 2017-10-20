import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Sponsor.css'
import { handleOutboundSponsorClick } from 'services/analytics'

Item.propTypes = {
    src: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}

function Item({ src, url, title = url }) {
    return (
        <a
            styleName="Item"
            href={url}
            target="_blank"
            title={title}
            onClick={handleOutboundSponsorClick}>
            <img styleName="Logo" src={src} alt={title} />
        </a>
    )
}

export default CSSModules(Item, styles)
