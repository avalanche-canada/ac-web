import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Router, Redirect, Location } from '@reach/router'
import { AvalancheCanada, AvalancheCanadaFoundation } from 'layouts'
import ScrollTo from 'components/ScrollTo'
import Analytics from 'services/analytics'
import polyfills from 'polyfills'

import 'services/sentry'

import 'styles'

render(window)

async function render(self) {
    await polyfills(self)

    ReactDOM.render(
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
        </Location>,
        document.getElementById('app')
    )
}

// Subroutes
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
