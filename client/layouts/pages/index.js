import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Link } from '@reach/router'
import { Header, Main, Content, Headline, Section } from 'components/page'
import * as Text from 'components/text'
import { ButtonSet } from 'components/button'
import { Credit } from 'components/misc'
import { Mailto } from 'components/anchors'
import Footer from 'components/footer'
import Navbar from 'layouts/Navbar'
import SPAW from 'layouts/SPAW'
import Highlight from 'layouts/Highlight'
import { notFound } from 'services/analytics'
import { supported } from 'utils/mapbox'
import styles from './pages.css'

// High level components
export function Page({
    footer = <Footer />,
    navbar = <Navbar />,
    className,
    children,
}) {
    return (
        <div className={classnames(styles.Page, className)}>
            <header>{navbar}</header>
            <div>
                <div>
                    <SPAW />
                    <Highlight />
                    {children}
                </div>
                {footer}
            </div>
        </div>
    )
}

export function Screen({ footer, navbar = <Navbar />, className, children }) {
    return (
        <div className={classnames(styles.Screen, className)}>
            <header>
                {navbar}
                <SPAW />
                <Highlight />
            </header>
            <main>{children}</main>
            {footer}
        </div>
    )
}

// Layouts components
Error.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
}

// TODO Simplify usage of the page component, <Content> might not be required
export function Error({ children, className, ...rest }) {
    return (
        <Screen className={classnames(styles.Error, className)} {...rest}>
            <Content>
                {children}
                <Credit>Kroschel Films</Credit>
            </Content>
        </Screen>
    )
}

export function NotFound({ location, navbar }) {
    notFound(location)

    return (
        <Error navbar={navbar}>
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

// TODO Review that!!!
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

// Aggregator components
Layout.propTypes = {
    title: PropTypes.string.isRequired,
    headline: PropTypes.node,
    children: PropTypes.node.isRequired,
}

export function Layout({ title, headline, children }) {
    return (
        <Page>
            <Header title={title} />
            <Content>
                <Main>
                    <Section>
                        {headline && <Headline>{headline}</Headline>}
                        {children}
                    </Section>
                </Main>
            </Content>
        </Page>
    )
}

UnsupportedMap.propTypes = {
    links: PropTypes.instanceOf(Map),
    headline: PropTypes.node,
}

export function UnsupportedMap({
    headline = 'It seems that your browser does not support the technology required (WebGL for the geeks) to show forecasts, advisories and other avalanche - related information on our map.',
    links = new Map([
        ['/forecasts', 'Forecast regions'],
        ['/advisories', 'Avalanche Advisories'],
        ['/weather/stations', 'Weather stations'],
    ]),
}) {
    return (
        <Error>
            <Main>
                <h1>Uh oh! You never thought that would happen...</h1>
                <Headline>
                    {headline}
                    <br />
                    We suggest you{' '}
                    <a href="//outdatedbrowser.com" target="_blank">
                        update your browser
                    </a>{' '}
                    and make sure that WebGL is{' '}
                    <a href="//get.webgl.org/" target="_blank">
                        enabled
                    </a>
                    .
                </Headline>
                <p />
                <ButtonSet>
                    {Array.from(links, ([link, text]) => (
                        <Link key={link} className={styles.Link} to={link}>
                            {text}
                        </Link>
                    ))}
                </ButtonSet>
                <Headline>
                    If you need help or have questions, do not hesitate to send
                    us an{' '}
                    <Mailto
                        email="kguillotte@avalanche.ca,wharding@avalanche.ca"
                        subject="Unsupported map"
                        body={`\n\n\nMapBox GL supported: ${supported()}\nNavigator: ${
                            navigator.userAgent
                        }`}>
                        email
                    </Mailto>
                    .
                </Headline>
            </Main>
        </Error>
    )
}

export function Fallback({ error, navbar, children }) {
    return (
        <Error navbar={navbar}>
            <Main>
                <h1>Uh oh! We never thought that would happen...</h1>
                <Headline>
                    An error occured on the page you are visiting.
                    <br />
                    We have been notified about that error and we will try to
                    fix as soon as possible.
                </Headline>
                <details>
                    <summary>More details</summary>
                    <Text.Error>{error.name}</Text.Error>
                    <Text.Error>{error.message}</Text.Error>
                </details>
                {children}
            </Main>
        </Error>
    )
}
