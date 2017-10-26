import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { PrivateRoute, NotFoundRoute, StaticPageRoute } from 'router/common'
import loadSubmit from 'bundle-loader?lazy!containers/min/Form'
import Submission from 'containers/MountainInformationNetworkSubmission'
import { Page as Submissions } from 'layouts/min/table'
import { parse } from 'utils/search'
import { Loading } from 'components/text'
import Bundle from 'components/Bundle'

function Submit(props) {
    return (
        <Bundle load={loadSubmit}>
            {Component => (Component ? <Component {...props} /> : <Loading />)}
        </Bundle>
    )
}

function submissions({ location }) {
    let { days, types, sorting } = parse(location.search)

    return (
        <Submissions
            days={typeof days === 'string' ? Number(days) : undefined}
            types={new Set(typeof types === 'string' ? [types] : types)}
            sorting={sorting}
        />
    )
}

export default function MountainInformationNetwork({ match: { path } }) {
    return (
        <Switch>
            <PrivateRoute path={`${path}/submit`} component={Submit} />
            <Route path={`${path}/submissions/:id`} component={Submission} />
            <Route path={`${path}/submissions`} render={submissions} />
            <StaticPageRoute
                path={`${path}/submission-guidelines`}
                uid="mountain-information-network-submission-guidelines"
                title="Mountain Information Network — Submission Guidelines"
            />
            <StaticPageRoute
                path={`${path}/faq`}
                uid="mountain-information-network-faq"
                title="Mountain Information Network — FAQ"
            />
            <StaticPageRoute
                uid="mountain-information-network-overview"
                title="Mountain Information Network — Overview"
            />
            <NotFoundRoute />
        </Switch>
    )
}
