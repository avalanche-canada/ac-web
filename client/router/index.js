import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { AvalancheCanada, AvalancheCanadaFoundation } from 'layouts'
import ScrollTo from './ScrollTo'
import Analytics from './Analytics'

export default function Router() {
    return (
        <BrowserRouter>
            <Analytics>
                <ScrollTo>
                    <Switch>
                        <Route path="/cac" render={cac} />
                        <Route path="/fxresources/*" render={redirect} />
                        <Redirect from="/cherrybowl" to="/cherry-bowl" />
                        <Route path="/cherry-bowl*" render={redirect} />
                        <Route
                            path="/foundation"
                            component={AvalancheCanadaFoundation}
                        />
                        <Route path="/" component={AvalancheCanada} />
                    </Switch>
                </ScrollTo>
            </Analytics>
        </BrowserRouter>
    )
}

// Subroutes
function cac({ match }) {
    const { path } = match

    return (
        <Switch>
            <Redirect
                from={`${path}/training/ast/courses`}
                to="/training/courses"
            />
            <Redirect from={`${path}/training/overview`} to="/training" />
            <Redirect from={`${path}/training/online-course`} to="/tutorial" />
            <Redirect from={path} to="/" />
        </Switch>
    )
}

// Utils
function redirect({ location: { pathname } }) {
    // Leave the application and goes to nginx to do appropriate redirect
    window.open(`https://avalanche.ca/${pathname}`, pathname)

    return null
}
