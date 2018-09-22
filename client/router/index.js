import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { AvalancheCanada, AvalancheCanadaFoundation } from 'layouts'
import ScrollTo from './ScrollTo'
import Analytics from './Analytics'

export default function Base() {
    return (
        <Analytics>
            <ScrollTo>
                <Router>
                    <CAC path="cac" />
                    <Route path="/fxresources/*" render={redirect} />
                    <Redirect from="/cherrybowl" to="/cherry-bowl" />
                    <Route path="/cherry-bowl/*" render={redirect} />
                    <Route
                        path="/foundation"
                        component={AvalancheCanadaFoundation}
                    />
                    <Route path="/" component={AvalancheCanada} />
                </Router>
            </ScrollTo>
        </Analytics>
    )
}

// Subroutes
function CAC() {
    return (
        <Switch>
            <Redirect from="/training/ast/courses" to="/training/courses" />
            <Redirect from="/training/overview" to="/training" />
            <Redirect from="/training/online-course" to="/tutorial" />
            <Redirect from="" to="/" />
        </Switch>
    )
}

// Utils
function redirect({ location: { pathname } }) {
    // Leave the application and goes to nginx to do appropriate redirect
    window.open(`https://avalanche.ca/${pathname}`, pathname)

    return null
}
