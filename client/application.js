import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Router, Redirect, Location } from '@reach/router'
import { AvalancheCanada, AvalancheCanadaFoundation } from 'layouts'
import ScrollTo from 'components/ScrollTo'
import ErrorBoundary from 'components/ErrorBoundary'
import Analytics from 'services/analytics'
import { Fallback } from 'components/application'

import 'styles'

export default function application() {
    ReactDOM.render(
        <ErrorBoundary fallback={<Fallback />}>
            <Location>
                {({ location }) => (
                    <StrictMode>
                        <Analytics location={location}>
                            <ScrollTo location={location}>
                                <Router primary={false}>
                                    <CAC path="cac" />
                                    <AvalancheCanada path="/*" />
                                    <AvalancheCanadaFoundation path="foundation/*" />
                                </Router>
                            </ScrollTo>
                        </Analytics>
                    </StrictMode>
                )}
            </Location>
        </ErrorBoundary>,
        document.getElementById('app')
    )
}

// Subroutes
// TODO Make a better catch all cac/* to /
function CAC() {
    return (
        <Router>
            <Redirect from="training/ast/courses" to="training/courses" />
            <Redirect from="training/overview" to="training" />
            <Redirect from="training/online-course" to="tutorial" />
            <Redirect from="/" to="/" />
        </Router>
    )
}
