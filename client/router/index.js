import React, { createElement } from 'react'
import {
    BrowserRouter as Base,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom'
import { AvalancheCanada, AvalancheCanadaFoundation } from '~/layouts'
import { FallbackPage } from '~/prismic/containers'
import redirects from './redirects'

// import { scrollPosition } from '~/utils/dom'
// function shouldUpdateScroll(previous, next) {
//     if (!previous) {
//         return true
//     }
//
//     const { location: { hash, pathname } } = next
//
//     if (hash) {
//         return scrollPosition(hash) || [0, 0]
//     }
//
//     return pathname !== previous.location.pathname
// }

// TODO: Look if still need that, it is used for the listen or listenBefore function!
// There is probably a way to get around it!

function redirect({ location }) {
    // Leave the application and goes to nginx to do appropriate redirect
    document.location = location.pathname
}

export default function Router() {
    return (
        <Base>
            <Switch>
                {RedirectRoutes}
                <Route path="/fxresources/*" render={redirect} />
                <Route path="/cherry-bowl*" render={redirect} />
                <Route
                    path="/foundation"
                    component={AvalancheCanadaFoundation}
                />
                <Route path="/pages/:type/:uid" component={FallbackPage} />
                <Route path="/" component={AvalancheCanada} />
            </Switch>
        </Base>
    )
}

const RedirectRoutes = Array.from(redirects).map(([from, to]) =>
    createElement(Redirect, { from, to })
)
