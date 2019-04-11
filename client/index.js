import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Router, Redirect, Location } from '@reach/router'
import { AvalancheCanada, AvalancheCanadaFoundation } from 'layouts'
import ScrollTo from 'components/ScrollTo'
import Analytics from 'services/analytics'

import 'services/sentry'

import 'styles'

ReactDOM.render(
    <Location>{application}</Location>,
    document.getElementById('app')
)

function application({ location }) {
    return (
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
