import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Link } from '@reach/router'
import * as Text from 'components/text'
import { Credit } from 'components/misc'
import { ButtonSet } from 'components/button'
import { Ribbon } from 'components/misc'
import { useWindowSize } from 'hooks'
import FragmentIdentifier from 'router/FragmentIdentifier'
import Sponsor from 'layouts/Sponsor'
import { notFound } from 'services/analytics'
import styles from './Page.css'

export function Page({ children, className, ...props }) {
    return (
        <div {...props} className={classnames(styles.Page, className)}>
            {children}
        </div>
    )
}

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
    level = 1,
    ribbon,
    hash,
    title,
}) {
    // TODO: No header tag if there is no more than a "heading" tag

    const header = `h${level + 1}`

    if (hash) {
        title = <FragmentIdentifier hash={hash}>{title}</FragmentIdentifier>
    }

    return (
        <section className={styles.Section}>
            {ribbon ? (
                <Ribbon caption={ribbon}>{title}</Ribbon>
            ) : (
                <header>
                    {createElement(header, null, title)}
                    {headline && <Headline>{headline}</Headline>}
                </header>
            )}
            {children}
        </section>
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

// Layouts
// TODO Should me moved to layouts
Error.propTypes = {
    children: PropTypes.node.isRequired,
}

export function Error({ children }) {
    return (
        <Page className={styles.Error}>
            <Content>
                {children}
                <Credit>Kroschel Films</Credit>
            </Content>
        </Page>
    )
}

export function NotFound({ location }) {
    notFound(location)

    return (
        <Error>
            <Main>
                <h1>This is an avalanche size 404 error...</h1>
                <div>
                    <h2>The page you are looking for has not been found.</h2>
                    <ButtonSet>
                        <Link to="/" className={styles.Link}>
                            Forecasts
                        </Link>
                        <Link to="/training" className={styles.Link}>
                            Training
                        </Link>
                        <Link to="/news" className={styles.Link}>
                            Latest news
                        </Link>
                        <Link to="/events" className={styles.Link}>
                            Upcoming events
                        </Link>
                        <Link to="/blogs" className={styles.Link}>
                            Our blog
                        </Link>
                    </ButtonSet>
                </div>
            </Main>
        </Error>
    )
}

export function Loading({ title, children }) {
    return (
        <Page>
            <Content>
                <Main>
                    <Text.Loading as="h1">{title}</Text.Loading>
                    {children}
                </Main>
            </Content>
        </Page>
    )
}
