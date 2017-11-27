import React from 'react'
import PropTypes from 'prop-types'
import memoize from 'lodash/memoize'
import * as Icons from 'components/icons'
import styles from './Social.css'
import { FACEBOOK, TWITTER, INSTAGRAM, VIMEO, GOOGLE_PLUS } from './Providers'

const PROVIDER_REGEXES = new Map([
    [FACEBOOK, /facebook.com/],
    [TWITTER, /twitter.com/],
    [INSTAGRAM, /instagram.com/],
    [VIMEO, /vimeo.com/],
    [GOOGLE_PLUS, /plus.google.com/],
])
const PROVIDER_NAMES = new Map([
    [FACEBOOK, 'Facebook'],
    [TWITTER, 'Twitter'],
    [INSTAGRAM, 'Instagram'],
    [VIMEO, 'Vimeo'],
    [GOOGLE_PLUS, 'Google Plus'],
])
const PROVIDER_ICONS = new Map([
    [FACEBOOK, <Icons.Facebook />],
    [TWITTER, <Icons.Twitter />],
    [INSTAGRAM, <Icons.Instagram />],
    [VIMEO, <Icons.Vimeo />],
    [GOOGLE_PLUS, <Icons.GooglePlus />],
    [null, <Icons.Website />],
])

const getProvider = memoize(url => {
    for (const [provider, regex] of PROVIDER_REGEXES) {
        if (regex.test(url)) {
            return provider
        }
    }

    return null
})

Item.propTypes = {
    link: PropTypes.string.isRequired,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    children: PropTypes.node,
    style: PropTypes.object,
}

export default function Item({ link, title, children, style }) {
    const provider = getProvider(link)
    const name = PROVIDER_NAMES.get(provider)

    if (!title) {
        title = `Visit on ${name}.`
    } else if (typeof title === 'function') {
        title = title(name)
    }

    return (
        <a
            className={styles.Item}
            target="_blank"
            href={link}
            title={title}
            style={style}>
            {PROVIDER_ICONS.get(provider)}
            {children}
        </a>
    )
}
