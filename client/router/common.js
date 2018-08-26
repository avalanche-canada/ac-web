import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { NotFound } from 'components/page'
import * as Auth from 'contexts/auth'
import ga from 'services/analytics'
import { StaticPage, Generic } from 'prismic/containers'
import { WorkInProgress } from 'components/page'
import { STATIC_PAGE } from 'constants/prismic'
import Sponsor from 'containers/Sponsor'
import * as Pages from 'prismic/components/page'

export class ProtectedRoute extends Component {
    static PATHS = new Set()
    componentDidMount() {
        ProtectedRoute.PATHS.add(this.props.path)
    }
    renderRoute = ({ isAuthenticated }) =>
        isAuthenticated ? (
            <Route {...this.props} />
        ) : (
            <Redirect
                to={{
                    pathname: '/login',
                    state: {
                        from: this.props.location,
                    },
                }}
            />
        )
    render() {
        return <Auth.Consumer>{this.renderRoute}</Auth.Consumer>
    }
}

function notFound({ location: { pathname } }) {
    ga.event({
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

GenericPageRoute.propTypes = {
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

export function GenericPageRoute({ path, uid, title }) {
    return <Route path={path} render={genericFactory(uid, title)} />
}

WIPPageRoute.propTypes = {
    path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    oldUrl: PropTypes.string.isRequired,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

export function WIPPageRoute({ path, ...props }) {
    return <Route path={path} render={() => <WorkInProgress {...props} />} />
}

SponsorRoute.propTypes = {
    path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
}

export function SponsorRoute({ path, ...props }) {
    return <Route path={path} render={() => <Sponsor {...props} />} />
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
