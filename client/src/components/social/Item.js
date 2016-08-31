import React, {PropTypes, createElement} from 'react'
import {compose, withProps, defaultProps, setDisplayName, setPropTypes} from 'recompose'
import CSSModules from 'react-css-modules'
import * as Icons from 'components/icons'
import styles from './Social.css'

const {assign} = Object
// FIXME: This will break on the server side rendering
const anchor = document.createElement('a')

const Providers = new Map([
    ['www.facebook.com', 'Facebook'],
    ['www.twitter.com', 'Twitter'],
    ['www.instagram.com', 'Instagram'],
])

function getProvider(href) {
    const {hostname} = assign(anchor, {href})

    return Providers.get(hostname) || 'Website'
}

Item.propTypes = {
    link: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
}

function Item({link, fullName}) {
    const provider = getProvider(link)
    const title = `Visit ${fullName}'s on ${provider}.`

    return (
        <a styleName='Item' target='_blank' href={link} title={title}>
            {createElement(Icons[provider])}
        </a>
    )
}

export default CSSModules(Item, styles)
