import '@babel/polyfill'
import 'raf/polyfill'
import 'url-search-params-polyfill'
import 'whatwg-fetch'
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch'

import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Match, Redirect } from '@reach/router'
import { AvalancheCanada, AvalancheCanadaFoundation } from 'layouts'
import configureRaven from 'services/raven'
import * as Auth from 'contexts/auth'

import 'styles'

configureRaven()

// TODO: Add Analytics and ScrollTo

const application = (
    <Auth.Provider>
        <Router>
            <CAC path="cac" />
            <Redirect from="cherrybowl/*" to="cherry-bowl" />
            <Match path="fxresources/*">{redirect}</Match>
            <Match path="cherry-bowl/*">{redirect}</Match>
            <AvalancheCanada path="/*" />
            <AvalancheCanadaFoundation path="foundation/*" />
        </Router>
    </Auth.Provider>
)

ReactDOM.render(application, document.getElementById('app'))

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

// Utils
function redirect({ match }) {
    if (match) {
        const { path } = match

        // Leave the application and goes to nginx to do appropriate redirect
        window.open(`https://avalanche.ca/${path}`, path)
    }

    return null
}
