import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import AuthService from '~/services/auth'
import { NotFound } from '~/components/page'
import ReactGA from '~/services/analytics'
import { parse } from '~/utils/search'

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

LoginRoute.propTypes = {
    path: PropTypes.string.isRequired,
}

export function LoginRoute({ path }) {
    return <Route path={path} render={login} />
}

export function loginComplete({ location, history }) {
    const { id_token, access_token } = parse(location.search)

    if (id_token && access_token) {
        // TODO: need to dispatch tokens
        console.warn(id_token, access_token)
        // dispatch(receiveToken(id_token, access_token))
    }
    console.warn(location)
    history.replace(location.state.from || '/')
}

LoginCompleteRoute.propTypes = {
    path: PropTypes.string.isRequired,
}

export function LoginCompleteRoute({ path }) {
    return <Route path={path} render={loginComplete} />
}

function notFound({ location: { pathname } }) {
    ReactGA.event({
        category: 'Navigation',
        action: 'Not Found',
        label: pathname,
        nonInteraction: true,
    })

    return <NotFound />
}

NotFoundRoute.propTypes = {
    path: PropTypes.string.isRequired,
}

export function NotFoundRoute({ path }) {
    return <Route path={path} render={notFound} />
}
