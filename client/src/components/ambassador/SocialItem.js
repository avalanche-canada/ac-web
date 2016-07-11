import React, {PropTypes, createElement} from 'react'
import CSSModules from 'react-css-modules'
import * as ICONS from 'components/icons'
import styles from './Ambassador.css'

SocialItem.propTypes = {
    link: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
}

const PROVIDERS = new Map([
    ['www.facebook.com', 'Facebook'],
    ['www.twitter.com', 'Twitter'],
    ['www.instagram.com', 'Instagram'],
])

const anchor = document.createElement('a')
const {assign} = Object

function getProvider(href) {
    const {hostname} = assign(anchor, {href})

    return PROVIDERS.get(hostname) || 'Website'
}

function SocialItem({link, fullName}) {
    const provider = getProvider(link)

    return (
        <a styleName='SocialItem' target='_blank' href={link} title={`Visit ${fullName}'s on ${provider}.`} >
            {createElement(ICONS[provider])}
        </a>
    )
}

export default CSSModules(SocialItem, styles)
