import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import AuthService from '~/services/auth'
import { NotFound } from '~/components/page'
import LoginComplete from '~/containers/LoginComplete'
import ReactGA from '~/services/analytics'
import { StaticPage, Generic } from '~/prismic/containers'
import { WorkInProgress } from '~/components/page'

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
            auth.login().catch(() => props.history.push('/'))

            return null
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

LoginCompleteRoute.propTypes = {
    path: PropTypes.string.isRequired,
}

export function LoginCompleteRoute(props) {
    return <Route {...props} component={LoginComplete} />
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

StaticPageRoute.propTypes = {
    path: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    title: PropTypes.string,
}

function staticPageFactory(uid, title) {
    return function staticPage() {
        return <StaticPage uid={uid} title={title} />
    }
}

export function StaticPageRoute({ path, uid, title }) {
    return <Route path={path} render={staticPageFactory(uid, title)} />
}

GenricPageRoute.propTypes = {
    path: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    title: PropTypes.string,
}

function genericFactory(uid, title) {
    return function generic() {
        return <Generic uid={uid} title={title} />
    }
}

export function GenricPageRoute({ path, uid, title }) {
    return <Route path={path} render={genericFactory(uid, title)} />
}

WIPPageRoute.propTypes = {
    path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    oldUrl: PropTypes.string.isRequired,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

export function WIPPageRoute({ path, ...rest }) {
    return <Route path={path} render={() => <WorkInProgress {...rest} />} />
}
