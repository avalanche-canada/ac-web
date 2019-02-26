// Polyfills and shims
import 'raf/polyfill'
import 'url-search-params-polyfill'
import 'whatwg-fetch'
import 'utils/polyfills/requestIdleCallback'
// https://github.com/babel/babel/issues/8449
import 'core-js/fn/symbol/iterator'

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
