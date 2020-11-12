import React, { isValidElement, createElement } from 'react'
import PropTypes from 'prop-types'
import { Mailto } from 'components/anchors'
import * as Social from 'components/social'
import * as Icons from 'components/icons'
import styles from './Sidebar.css'
import { FormattedMessage, useIntl } from 'react-intl'

Sidebar.propTypes = {
    children: PropTypes.node.isRequired,
}

export function Sidebar({ children }) {
    return <nav className={styles.Sidebar}>{children}</nav>
}

SocialItem.propTypes = {
    label: PropTypes.node,
    children: PropTypes.node.isRequired,
}

export function SocialItem({ label, children }) {
    return (
        <div className={styles.SocialItem}>
            {label && <span className={styles.Label}>{label}</span>}
            {children}
        </div>
    )
}

RSSFeed.propTypes = {
    url: PropTypes.string.isRequired,
}

export function RSSFeed({ url }) {
    const intl = useIntl()
    const title = intl.formatMessage({
        description: 'Sidebar',
        defaultMessage: 'Subscribe to our RSS Feed',
    })

    return (
        <SocialItem>
            <a href={url} target="_blank" title={title}>
                <FormattedMessage
                    defaultMessage="RSS Feed"
                    description="Sidebar"
                />
                {'\u00A0'}
                <Icons.RSS />
            </a>
        </SocialItem>
    )
}

Share.propTypes = {
    url: PropTypes.string.isRequired,
    label: PropTypes.string,
}

export function Share({ label, url = document.location.href }) {
    const intl = useIntl()
    const urls = Social.createShareUrls(url)
    function createTitle(name) {
        return intl.formatMessage({
            defaultMessage: 'Share this page on {name}',
            values: {
                name,
            },
        })
    }

    label =
        label ||
        intl.formatMessage({
            defaultMessage: 'Share this page',
        })

    return (
        <SocialItem label={label}>
            {urls.map(url => (
                <Social.Item key={url} link={url} title={createTitle} />
            ))}
        </SocialItem>
    )
}

Print.propTypes = {
    url: PropTypes.string,
}

export function Print({ url }) {
    const intl = useIntl()
    const title = intl.formatMessage({
        description: 'FX Sidebar',
        defaultMessage: 'Print this forecast bulletin',
    })

    return (
        <SocialItem>
            <a href={url} target="printable-forecast" title={title}>
                <FormattedMessage
                    description="Sidebar"
                    defaultMessage="Printable version"
                />
                {'\u00A0'}
                <Icons.Print />
            </a>
        </SocialItem>
    )
}

export function Item({ children, ...props }) {
    return (
        <div {...props} className={styles.Item}>
            {children}
        </div>
    )
}

Header.propTypes = {
    children: PropTypes.node.isRequired,
}

export function Header({ children }) {
    return <header className={styles.Header}>{children}</header>
}

Follow.propTypes = {
    urls: PropTypes.arrayOf(PropTypes.string),
    label: PropTypes.string,
}

export function Follow({
    label = <FormattedMessage defaultMessage="Follow us" />,
    urls = URLS,
}) {
    const intl = useIntl()
    function createTitle(name) {
        return intl.formatMessage({
            defaultMessage: '{label} on {name}',
            description: '"Follow us on Facebook" in the Sidebar',
            values: {
                label,
                name,
            },
        })
    }

    return (
        <SocialItem label={label}>
            {urls.map(url => (
                <Social.Item key={url} link={url} title={createTitle} />
            ))}
        </SocialItem>
    )
}

Contact.propTypes = {
    email: PropTypes.string,
}

export function Contact(props) {
    return (
        <SocialItem>
            <Mailto {...props}>
                <FormattedMessage
                    defaultMessage="Contact us"
                    description="Sidebar"
                />
                {'\u00A0'}
                <Icons.Email fill="#245EAC" />
            </Mailto>
        </SocialItem>
    )
}

CompleteSidebar.propTypes = {
    contact: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
    share: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
    follow: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
    children: PropTypes.node,
}

export default function CompleteSidebar({ children, contact, share, follow }) {
    return (
        <Sidebar>
            {children}
            {createSocialElement(share, Share)}
            {createSocialElement(follow, Follow)}
            {createSocialElement(contact, Contact)}
        </Sidebar>
    )
}

// Utils & constants
function createSocialElement(element, component) {
    if (element === true) {
        return createElement(component)
    }

    return isValidElement(element) ? element : null
}
const URLS = [
    'https://www.facebook.com/avalanchecanada',
    'https://twitter.com/avalancheca',
    'https://instagram.com/avalanchecanada',
]
