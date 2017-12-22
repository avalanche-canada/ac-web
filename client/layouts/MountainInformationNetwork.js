import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { PrivateRoute, NotFoundRoute, StaticPageRoute } from 'router/common'
import loadSubmit from 'bundle-loader?lazy!containers/min/Form'
import Submission from 'layouts/min/Submission'
import SubmissionList from 'layouts/min/SubmissionList'
import * as utils from 'utils/search'
import { Loading } from 'components/text'
import Bundle from 'components/Bundle'

function Submit(props) {
    return (
        <Bundle load={loadSubmit}>
            {Component => (Component ? <Component {...props} /> : <Loading />)}
        </Bundle>
    )
}

function submission({ match }) {
    return <Submission id={match.params.id} />
}

function submissions({ location, history }) {
    const { days, types, regions, sorting } = utils.parse(location.search)
    function onParamsChange({ days, types, regions, sorting }) {
        history.push({
            ...location,
            search: utils.stringify({
                days,
                types,
                regions,
                sorting: utils.formatSorting(sorting),
            }),
        })
    }

    return (
        <SubmissionList
            days={utils.toNumber(days)}
            types={utils.toSet(types)}
            regions={utils.toSet(regions)}
            sorting={utils.parseSorting(sorting)}
            onParamsChange={onParamsChange}
        />
    )
}

export default function MountainInformationNetwork({ match: { path } }) {
    return (
        <Switch>
            <PrivateRoute path={`${path}/submit`} component={Submit} />
            <Route path={`${path}/submissions/:id`} render={submission} />
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
