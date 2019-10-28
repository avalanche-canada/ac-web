import React, { isValidElement, createElement } from 'react'
import PropTypes from 'prop-types'
import { Mailto } from 'components/anchors'
import * as Social from 'components/social'
import * as Icons from 'components/icons'
import styles from './Sidebar.css'

Sidebar.propTypes = {
    children: PropTypes.node.isRequired,
}

export function Sidebar({ children }) {
    return <nav className={styles.Sidebar}>{children}</nav>
}

SocialItem.propTypes = {
    label: PropTypes.string,
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
    return (
        <SocialItem>
            <a href={url} target="_blank" title="Subscribe to our RSS Feed">
                RSS Feed{'\u00A0'}
                <Icons.RSS />
            </a>
        </SocialItem>
    )
}

Share.propTypes = {
    url: PropTypes.string.isRequired,
    label: PropTypes.string,
}

export function Share({ label = 'Share this', url = document.location.href }) {
    const title = name => `Share this page on ${name}`
    const urls = Social.createShareUrls(url)

    return (
        <SocialItem label={label}>
            {urls.map(url => (
                <Social.Item key={url} link={url} title={title} />
            ))}
        </SocialItem>
    )
}

Print.propTypes = {
    url: PropTypes.string,
}

export function Print({ url }) {
    return (
        <SocialItem>
            <a
                href={url}
                target="avcan-print-forecast"
                title="Print this forecast bulletin">
                Printable version{'\u00A0'}
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

export function Follow({ label = 'Follow us', urls = URLS }) {
    const title = name => `${label} on ${name}`

    return (
        <SocialItem label={label}>
            {urls.map(url => (
                <Social.Item key={url} link={url} title={title} />
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
                Contact us{'\u00A0'}
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
