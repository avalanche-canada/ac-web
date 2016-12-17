import React, {PropTypes} from 'react'
import CSSModules from 'react-css-modules'
import styles from './Sponsor.css'

Item.propTypes = {
    src: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}

function Item({src, url, title = url}) {
    return (
        <a styleName='Item' href={url} target='_blank' title={title} >
            <img styleName='Logo' src={src} alt={title} />
        </a>
    )
}

export default CSSModules(Item, styles)
