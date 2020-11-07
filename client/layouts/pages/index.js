import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Link } from '@reach/router'
import { Helmet } from 'react-helmet'
import { FormattedMessage, useIntl } from 'react-intl'
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
                <FormattedMessage
                    description="Layout pages/NotFound"
                    defaultMessage="This is an avalanche size 404 error..."
                />
                <small>
                    <FormattedMessage
                        description="Layout pages/NotFound"
                        defaultMessage="The page you are looking for has not been found."
                    />
                </small>
            </h1>
            <ButtonSet>
                <Link to="/" className={styles.Link}>
                    <FormattedMessage
                        description="Layout pages/NotFound"
                        defaultMessage="Forecasts"
                    />
                </Link>
                <Link to="/training" className={styles.Link}>
                    <FormattedMessage
                        description="Layout pages/NotFound"
                        defaultMessage="Training"
                    />
                </Link>
                <Link to="/news" className={styles.Link}>
                    <FormattedMessage
                        description="Layout pages/NotFound"
                        defaultMessage="Latest news"
                    />
                </Link>
                <Link to="/events" className={styles.Link}>
                    <FormattedMessage
                        description="Layout pages/NotFound"
                        defaultMessage="Upcoming events"
                    />
                </Link>
                <Link to="/blogs" className={styles.Link}>
                    <FormattedMessage
                        description="Layout pages/NotFound"
                        defaultMessage="Our blog"
                    />
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

export function UnsupportedMap() {
    return (
        <Error>
            <h1>
                <FormattedMessage
                    description="Layout pages/UnsupportedMap"
                    defaultMessage="Uh oh! You never thought that would happen..."
                />
            </h1>
            <p>
                <FormattedMessage
                    description="Layout pages/UnsupportedMap"
                    defaultMessage="It seems that your browser does not support the technology required (WebGL for the geeks) to show forecasts, advisories and other avalanche - related information on our map."
                />
            </p>
            <p>
                <FormattedMessage
                    description="Layout pages/UnsupportedMap"
                    defaultMessage="We suggest you <browser>update your browser</browser> and make sure that WebGL is <webGL>enabled</webGL>."
                    values={{
                        browser(chunks) {
                            return (
                                <a
                                    href="https://outdatedbrowser.com"
                                    target="_blank">
                                    {chunks}
                                </a>
                            )
                        },
                        webGL(chunks) {
                            return (
                                <a
                                    href="https://get.webgl.org/"
                                    target="_blank">
                                    {chunks}
                                </a>
                            )
                        },
                    }}
                />
            </p>
            <p>
                <FormattedMessage
                    description="Layout pages/UnsupportedMap"
                    defaultMessage="If you need help or have questions, do not hesitate to send us an <link>email</link>."
                    values={{
                        link(chunks) {
                            return <Support>{chunks}</Support>
                        },
                    }}
                />
            </p>
            <ButtonSet>
                <Link className={styles.Link} to="/forecasts">
                    <FormattedMessage
                        description="Layout pages/UnsupportedMap"
                        defaultMessage="Forecast regions"
                    />
                </Link>
                <Link className={styles.Link} to="/advisories">
                    <FormattedMessage
                        description="Layout pages/UnsupportedMap"
                        defaultMessage="Avalanche Advisories"
                    />
                </Link>
                <Link className={styles.Link} to="/weather/stations">
                    <FormattedMessage
                        description="Layout pages/UnsupportedMap"
                        defaultMessage="Weather stations"
                    />
                </Link>
            </ButtonSet>
        </Error>
    )
}

function Support({ children }) {
    const intl = useIntl()
    const { userAgent } = navigator
    const body = `\n\n\nMapBox GL supported: ${supported()}\nNavigator: ${userAgent}`
    const subject = intl.formatMessage({
        description: 'Layout pages/UnsupportedMap',
        defaultMessage: 'Unsupported map',
    })

    return (
        <Mailto email={SUPPORT} subject={subject} body={body}>
            {children}
        </Mailto>
    )
}

export function Fallback({ error, navbar, children }) {
    return (
        <Error navbar={navbar}>
            <h1>
                <FormattedMessage
                    description="Layout pages/Fallback"
                    defaultMessage="Uh oh! We never thought that would happen..."
                />
                <small>
                    <FormattedMessage
                        description="Layout pages/Fallback"
                        defaultMessage="An error occured on the page you are visiting."
                    />
                </small>
            </h1>
            <p>
                <FormattedMessage
                    description="Layout pages/Fallback"
                    defaultMessage="We have been notified about that error and we will try to fix as soon as possible."
                />
            </p>
            <details>
                <summary>
                    <FormattedMessage defaultMessage="More details" />
                </summary>
                <Text.Error>{error.name}</Text.Error>
                <Text.Error>{error.message}</Text.Error>
            </details>
            {children}
        </Error>
    )
}
