import React, { useLayoutEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { Credit } from 'components/misc'
import { Ribbon } from 'components/misc'
import { useWindowSize } from 'hooks'
import { useLocation } from 'router/hooks'
import Sponsor from 'layouts/Sponsor'
import styles from './Page.css'

// TODO Perhaps remove that component
Content.propTypes = {
    children: PropTypes.node.isRequired,
}

export function Content({ children, ...props }) {
    return (
        <div {...props} className={styles.Content}>
            {children}
        </div>
    )
}

Section.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.node.isRequired,
    ribbon: PropTypes.string,
    hash: PropTypes.string,
    headline: PropTypes.string,
    level: PropTypes.oneOf([1, 2, 3, 4, 5]),
}

export function Section({
    headline,
    children,
    // TODO Review that prop
    level = 1,
    // TODO Review if being used!
    ribbon,
    hash,
    title,
}) {
    const as = `h${level + 1}`

    return (
        <section className={styles.Section}>
            {ribbon ? (
                <Ribbon caption={ribbon}>{title}</Ribbon>
            ) : (
                <header>
                    <Heading as={as} hash={hash}>
                        {title}
                    </Heading>
                    {headline && <Headline>{headline}</Headline>}
                </header>
            )}
            {children}
        </section>
    )
}

// This component handles hash changes that are triggered by the router...
// Because the router does not trigger an "hashchange", this component is quite important
// Regular "hashchange" events are handle by the browser as expected.
export function Heading({ as: As = 'h2', hash, children }) {
    const href = '#' + hash
    const heading = useRef()
    const { location } = useLocation()

    if (hash) {
        children = <a href={href}>{children}</a>
    }

    useLayoutEffect(() => {
        if (!hash || location.hash !== href) {
            return
        }

        const { current } = heading

        current.scrollIntoView()

        // "setTimeout" to make sure it does not intefere with the browser,
        // when it move to a page, tries to find an anchor, does not find it,
        // so scroll position is set to the top of the page.
        // I do not know how to fix that without involving some weird logics with "hashchange" event.
        // To see it in actions, comment out the code,
        // In Chrome (using the navbar),
        //   - go to ambassadors page
        //   - then the main map
        //   - back to ambassadors page to #aleks-klassen
        // Boom! The page will not scroll.
        // 75ms is a magic number ;(
        setTimeout(() => {
            current.scrollIntoView()
        }, 75)
    }, [location.hash, href])

    return (
        <As id={hash} ref={heading} className={styles.Heading}>
            {children}
        </As>
    )
}

Main.propTypes = {
    children: PropTypes.node.isRequired,
}

export function Main({ children, ...props }) {
    return (
        <main className={styles.Main} {...props}>
            {children}
        </main>
    )
}

Banner.propTypes = {
    url: PropTypes.string.isRequired,
    copyright: PropTypes.string,
    children: PropTypes.node,
}

export function Banner({ url, copyright, children }) {
    const { width } = useWindowSize()
    const style = {
        backgroundImage: `url("${url}")`,
    }

    return (
        <div className={styles.Banner} style={style}>
            {copyright && <Credit compact={width < 400}>{copyright}</Credit>}
            {children}
        </div>
    )
}

Article.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
}

export function Article({ title, children }) {
    return (
        <article className={styles.Article}>
            {title && <h2>{title}</h2>}
            {children}
        </article>
    )
}

Header.propTypes = {
    title: PropTypes.node.isRequired,
    children: PropTypes.node,
}

export function Header({ title, children }) {
    return (
        <header className={styles.Header}>
            <h1>{title}</h1>
            {children}
            <Sponsor />
        </header>
    )
}

export function Headline({ children, ...props }) {
    // TODO Should a <strong> instead of a <div>
    return (
        <div {...props} className={styles.Headline}>
            {children}
        </div>
    )
}

Aside.propTypes = {
    children: PropTypes.node.isRequired,
}

export function Aside({ children, ...props }) {
    return (
        <aside className={styles.Aside} {...props}>
            {children}
        </aside>
    )
}

// List
// TODO Could be moved to another module
List.propTypes = {
    children: PropTypes.node,
    column: PropTypes.number,
    data: PropTypes.array,
    renderItem: PropTypes.function,
}

export function List({ data, renderItem, children, column }) {
    const style = typeof column === 'number' ? { columnCount: column } : null

    return (
        <ul style={style} className={styles.List}>
            {children || data.map(renderItem)}
        </ul>
    )
}

ListItem.propTypes = {
    children: PropTypes.number,
    to: PropTypes.string.isRequired,
    target: PropTypes.string,
}

export function ListItem({ children, to, ...link }) {
    return (
        <li>
            {link.target ? (
                <a href={to} {...link}>
                    {children}
                </a>
            ) : (
                <Link to={to} {...link}>
                    {children}
                </Link>
            )}
        </li>
    )
}
