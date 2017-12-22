import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import AuthService from 'services/auth'
import { NotFound } from 'components/page'
import LoginComplete from 'containers/LoginComplete'
import ReactGA from 'services/analytics'
import { StaticPage, Generic } from 'prismic/containers'
import { WorkInProgress } from 'components/page'
import { STATIC_PAGE } from 'constants/prismic'
import Sponsor from 'containers/Sponsor'
import * as Pages from 'prismic/components/page'

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
    return function renderStaticPage() {
        function render(props) {
            return <Pages.StaticPage uid={uid} title={title} {...props} />
        }

        return <StaticPage uid={uid}>{render}</StaticPage>
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
    return function renderGenericPage() {
        function render(props) {
            return <Pages.Generic title={title} {...props} />
        }

        return <Generic uid={uid}>{render}</Generic>
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

function sponsorFactory(name, label) {
    return function sponsor() {
        return <Sponsor name={name} label={label} />
    }
}

SponsorRoute.propTypes = {
    path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
}

export function SponsorRoute({ path, name, label }) {
    return <Route path={path} render={sponsorFactory(name, label)} />
}

function fallbackPage({ match }) {
    const { type, uid } = match.params
    const Container = type === STATIC_PAGE ? StaticPage : Generic
    const Component = type === STATIC_PAGE ? Pages.StaticPage : Pages.Generic

    return <Container uid={uid}>{props => <Component {...props} />}</Container>
}

FallbackPageRoute.propTypes = {
    path: PropTypes.string.isRequired,
}

export function FallbackPageRoute({ path }) {
    return <Route path={path} render={fallbackPage} />
}
