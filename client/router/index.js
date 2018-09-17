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
                        <Redirect
                            from="/map/ates"
                            to="/planning/trip-planner"
                        />
                        <Redirect
                            from="/trip-planner"
                            to="/planning/trip-planner"
                        />
                        <Redirect
                            from="/trip-planning/:page"
                            to="/planning/:page"
                        />
                        <Redirect from="/trip-planning" to="/planning" />
                        <Redirect
                            from="/cac/training/ast/courses"
                            to="/training/courses"
                        />
                        <Redirect
                            from="/cac/training/overview"
                            to="/training"
                        />
                        <Redirect
                            from="/cac/training/online-course"
                            to="/tutorial"
                        />
                        <Redirect from="/cac" to="/" />
                        <Redirect
                            from="/pages/static-page/planning"
                            to="/planning"
                        />
                        <Redirect
                            from="/pages/static-page/decision-making"
                            to="/planning/decision-making"
                        />
                        <Redirect from="/pages/static-page/sled" to="/sled" />
                        <Redirect from="/pages/static-page/youth" to="/youth" />
                        <Redirect
                            from="/pages/static-page/essential-gear"
                            to="/gear"
                        />
                        <Redirect
                            from="/pages/static-page/training"
                            to="/training"
                        />
                        <Redirect
                            from="/pages/static-page/mountain-information-network-overview"
                            to="/mountain-information-network"
                        />
                        <Redirect
                            from="/pages/static-page/mountain-information-network-submission-guidelines"
                            to="/mountain-information-network/submission-guidelines"
                        />
                        <Redirect from="/pages/static-page/about" to="/about" />
                        <Redirect
                            from="/pages/static-page/mountain-information-network-faq"
                            to="/mountain-information-network/faq"
                        />
                        <Redirect
                            from="/pages/static-page/ambassadors"
                            to="/ambassadors"
                        />
                        <Redirect
                            from="/pages/static-page/sponsors"
                            to="/sponsors"
                        />
                        <Redirect
                            from="/pages/static-page/collaborators"
                            to="/collaborators"
                        />
                        <Redirect
                            from="/pages/static-page/membership-overview"
                            to="/membership"
                        />
                        <Redirect
                            from="/generic/privacy-policy"
                            to="/privacy-policy"
                        />
                        <Redirect
                            from="/generic/terms-of-use"
                            to="/terms-of-use"
                        />
                        <Redirect from="/cherrybowl" to="/cherry-bowl" />
                        <Redirect
                            from="/min/submissions/:id"
                            to="/mountain-information-network/submissions/:id"
                        />
                        <Redirect
                            from="/min/:page"
                            to="/mountain-information-network/:page"
                        />
                        <Redirect
                            from="/min"
                            to="/mountain-information-network"
                        />
                        <Redirect from="/learn" to="/training" />
                        <Redirect
                            from="/forecast/:name"
                            to="/forecasts/:name"
                        />
                        <Redirect
                            from="/submit"
                            to="/mountain-information-network/submit"
                        />
                        <Route path="/fxresources/*" render={redirect} />
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

// Utils
function redirect({ location: { pathname } }) {
    // Leave the application and goes to nginx to do appropriate redirect
    window.open(`https://avalanche.ca/${pathname}`, pathname)

    return null
}
