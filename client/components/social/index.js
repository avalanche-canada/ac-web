import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { useIntl } from 'react-intl'
import * as Icons from 'components/icons'
import styles from './Social.module.css'

const FACEBOOK = 'FACEBOOK'
const TWITTER = 'TWITTER'
const INSTAGRAM = 'INSTAGRAM'
const VIMEO = 'VIMEO'

Item.propTypes = {
    link: PropTypes.string.isRequired,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    children: PropTypes.node,
    className: PropTypes.string,
}

export function Item({ link, title, children, className }) {
    const intl = useIntl()
    const provider = getProvider(link)
    const name = PROVIDER_NAMES.get(provider)

    if (!title) {
        title = intl.formatMessage({
            defaultMessage: 'Visit on {name}.',
            description: 'Social media',
            values: {
                name,
            },
        })
    } else if (typeof title === 'function') {
        title = title(name)
    }

    return (
        <a className={classnames(styles.Item, className)} target="_blank" href={link} title={title}>
            {PROVIDER_ICONS.get(provider)}
            {children}
        </a>
    )
}

export function Set({ children, ...props }) {
    return (
        <div {...props} className={styles.Set}>
            {children}
        </div>
    )
}

// Utils
export function createShareUrls(url) {
    return Array.from(SHARE_URL_CREATORS, ([_provider, create]) => create(url))
}
function getProvider(url) {
    for (const [provider, regex] of PROVIDER_REGEXES) {
        if (regex.test(url)) {
            return provider
        }
    }

    return null
}

// Constants
const PROVIDER_REGEXES = new Map([
    [FACEBOOK, /facebook.com/],
    [TWITTER, /twitter.com/],
    [INSTAGRAM, /instagram.com/],
    [VIMEO, /vimeo.com/],
])
const PROVIDER_NAMES = new Map([
    [FACEBOOK, 'Facebook'],
    [TWITTER, 'Twitter'],
    [INSTAGRAM, 'Instagram'],
    [VIMEO, 'Vimeo'],
    [null, 'Internet'],
])
const PROVIDER_ICONS = new Map([
    [FACEBOOK, <Icons.Facebook />],
    [TWITTER, <Icons.Twitter />],
    [INSTAGRAM, <Icons.Instagram />],
    [VIMEO, <Icons.Vimeo />],
    [null, <Icons.Website />],
])
const SHARE_URL_CREATORS = new Map([
    [FACEBOOK, url => `https://www.facebook.com/sharer.php?u=${url}`],
    [TWITTER, url => `https://twitter.com/intent/tweet?url=${url}`],
])
