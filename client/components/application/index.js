import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import * as Page from 'components/page'
import * as Text from 'components/text'
import * as Layouts from 'layouts/pages'
import Navbar from 'components/navbar'
import typography from 'components/text/Text.css'

// TODO Reuse existing page layouts
// TODO Move these to layouts
export function Fallback({ error, navbar, children }) {
    return (
        <Fragment>
            {navbar || <Navbar />}
            <Layouts.Error>
                <Page.Main>
                    <h1>Uh oh! We never thought that would happen...</h1>
                    <Page.Headline>
                        An error occured on the page you are visiting.
                        <br />
                        We have been notified about that error and we will try
                        to fix as soon as possible.
                    </Page.Headline>
                    <details>
                        <summary>More details</summary>
                        <Text.Error>{error.name}</Text.Error>
                        <Text.Error>{error.message}</Text.Error>
                    </details>
                    {children}
                </Page.Main>
            </Layouts.Error>
        </Fragment>
    )
}

ErrorDetails.propTypes = {
    error: PropTypes.instanceOf(Error),
    className: PropTypes.string,
    summary: PropTypes.string,
    children: PropTypes.node,
}

export function ErrorDetails({
    error,
    className,
    summary = 'An error occured.',
    children,
}) {
    return (
        <details className={classnames(typography.Error, className)}>
            <summary>{summary}</summary>
            {error && <p>{error.message}</p>}
            {children}
        </details>
    )
}
