import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import { Page, Header, Main, Content, Headline, Section } from 'components/page'
import * as Text from 'components/text'
import { ButtonSet } from 'components/button'
import { notFound } from 'services/analytics'
import { Credit } from 'components/misc'
import { Mailto } from 'components/anchors'
import Navbar from 'components/navbar'
import { supported } from 'utils/mapbox'
import styles from './pages.css'

// Layouts components
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

// TODO Reuse existing page layouts
export function Fallback({ error, navbar, children }) {
    return (
        <Fragment>
            {navbar || <Navbar />}
            <Error>
                <Main>
                    <h1>Uh oh! We never thought that would happen...</h1>
                    <Headline>
                        An error occured on the page you are visiting.
                        <br />
                        We have been notified about that error and we will try
                        to fix as soon as possible.
                    </Headline>
                    <details>
                        <summary>More details</summary>
                        <Text.Error>{error.name}</Text.Error>
                        <Text.Error>{error.message}</Text.Error>
                    </details>
                    {children}
                </Main>
            </Error>
        </Fragment>
    )
}
