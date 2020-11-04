import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Link } from '@reach/router'
import { Helmet } from 'react-helmet'
import { Header, Main, Content, Section } from 'components/page'
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
import { SUPPORT } from 'constants/emails'
import styles from './pages.css'

// High level components
export function Page({
    navbar = <Navbar />,
    footer = <Footer />,
    className,
    children,
}) {
    return (
        <Fragment>
            <Helmet>
                <title>Avalanche Canada</title>
            </Helmet>
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
        </Fragment>
    )
}

export function Screen({ navbar = <Navbar />, footer, className, children }) {
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

// TODO Simplify usage of the page component, <Content> might not be required and need a nicier page.
export function Error({ children, className, ...rest }) {
    return (
        <Screen className={classnames(styles.Error, className)} {...rest}>
            {children}
            <Credit>Kroschel Films</Credit>
        </Screen>
    )
}

export function NotFound({ location, navbar }) {
    notFound(location)

    return (
        <Error navbar={navbar}>
            <h1>
                This is an avalanche size 404 error...
                <small>The page you are looking for has not been found.</small>
            </h1>
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
                    <Section headline={headline}>{children}</Section>
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
            <h1>Uh oh! You never thought that would happen...</h1>
            <div>
                <p>{headline}</p>
                <p>
                    We suggest you{' '}
                    <a href="//outdatedbrowser.com" target="_blank">
                        update your browser
                    </a>{' '}
                    and make sure that WebGL is{' '}
                    <a href="//get.webgl.org/" target="_blank">
                        enabled
                    </a>
                    .
                </p>
                <p>
                    If you need help or have questions, do not hesitate to send
                    us an{' '}
                    <Mailto
                        email={SUPPORT}
                        subject="Unsupported map"
                        body={`\n\n\nMapBox GL supported: ${supported()}\nNavigator: ${
                            navigator.userAgent
                        }`}>
                        email
                    </Mailto>
                    .
                </p>
            </div>
            <ButtonSet>
                {Array.from(links, ([link, text]) => (
                    <Link key={link} className={styles.Link} to={link}>
                        {text}
                    </Link>
                ))}
            </ButtonSet>
        </Error>
    )
}

export function Fallback({ error, navbar, children }) {
    return (
        <Error navbar={navbar}>
            <h1>
                Uh oh! We never thought that would happen...
                <small>An error occured on the page you are visiting.</small>
            </h1>
            <p>
                We have been notified about that error and we will try to fix as
                soon as possible.
            </p>
            <details>
                <summary>More details</summary>
                <Text.Error>{error.toString()}</Text.Error>
                <Text.Error>{JSON.stringify(error.extra, null, 4)}</Text.Error>
            </details>
            {children}
        </Error>
    )
}
