import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { PrivateRoute, NotFoundRoute, StaticPageRoute } from '~/router/common'
import Submit from '~/containers/min/Form'
import MountainInformationNetworkSubmission from '~/containers/MountainInformationNetworkSubmission'
import * as MINTableLayouts from '~/layouts/min/table'

export default function MountainInformationNetwork({ match: { path } }) {
    return (
        <Switch>
            <PrivateRoute path={`${path}/submit`} component={Submit} />
            <Route
                path={`${path}/submissions`}
                component={MINTableLayouts.Page}
            />
            <Route
                path={`${path}/submissions/:id`}
                component={MountainInformationNetworkSubmission}
            />
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
