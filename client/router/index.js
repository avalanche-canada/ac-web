import React, { createElement } from 'react'
import {
    BrowserRouter as Base,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom'
import AuthService from '~/services/auth'
import { AvalancheCanada, AvalancheCanadaFoundation } from '~/layouts'
import { FallbackPage } from '~/prismic/containers'
import { NotFound } from '~/components/page'
// import { scrollPosition } from '~/utils/dom'
import ReactGA from '~/services/analytics'
import redirects from './redirects'

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

// export computeRouter from './computeRouter'
// export computeRoutes from './computeRoutes'

function redirect({ location }) {
    // Leave the application and goes to nginx to do appropriate redirect
    document.location = location.pathname
}

function notFound({ location: { pathname } }) {
    if (redirects.has(pathname)) {
        return <Redirect to={redirects.get(pathname)} />
    }

    ReactGA.event({
        category: 'Navigation',
        action: 'Not Found',
        label: pathname,
        nonInteraction: true,
    })

    return <NotFound />
}

export default function Router() {
    return (
        <Base>
            <Switch>
                <Route path="/fxresources/*" render={redirect} />
                <Route path="/cherry-bowl*" render={redirect} />
                <Route
                    path="/foundation"
                    component={AvalancheCanadaFoundation}
                />
                <Route path="/pages/:type/:uid" component={FallbackPage} />
                <Route path="/" component={AvalancheCanada} />
                <Route render={notFound} />
            </Switch>
        </Base>
    )
}

function privateRenderFactory(render, component, children) {
    return function privateRender(props) {
        const auth = AuthService.create()

        if (auth.isAuthenticated()) {
            if (component) {
                return createElement(component, props)
            } else {
                return (render || children)(props)
            }
        } else {
            const to = {
                pathname: '/login',
                state: {
                    from: props.location,
                },
            }

            return <Redirect to={to} />
        }
    }
}

export function PrivateRoute({ render, component, children, ...rest }) {
    return (
        <Route
            {...rest}
            render={privateRenderFactory(render, component, children)}
        />
    )
}

function login({ history, location }) {
    const auth = AuthService.create()
    function redirect() {
        history.replace(location.state.from || '/')
    }

    auth.login().then(redirect, redirect)

    return null
}

export function LoginRoute({ path = '/login', ...rest }) {
    return <Route path={path} {...rest} render={login} />
}

export function createRoute(props) {
    return createElement(Route, { key: props.path, ...props })
}
