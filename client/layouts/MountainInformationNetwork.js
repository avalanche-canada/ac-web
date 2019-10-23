import React, { lazy } from 'react'
import { Router } from '@reach/router'
import Bundle from 'components/Bundle'
import Submission from 'layouts/min/Submission'
import { StaticPage } from 'prismic/layouts'
import { Loading } from 'components/page'
import * as utils from 'utils/search'

export default function MountainInformationNetwork() {
    return (
        <Router>
            <Submit path="submit" />
            <Submissions path="submissions" />
            <Submission path="submissions/:id" />
            <StaticPage
                path="submission-guidelines"
                uid="mountain-information-network-submission-guidelines"
                title="Mountain Information Network — Submission Guidelines"
            />
            <StaticPage
                path="faq"
                uid="mountain-information-network-faq"
                title="Mountain Information Network — FAQ"
            />
            <StaticPage
                path="/"
                uid="mountain-information-network-overview"
                title="Mountain Information Network — Overview"
            />
        </Router>
    )
}

const SubmitContainer = lazy(() => import('layouts/min/Form'))

function Submit(props) {
    return (
        <Bundle fallback={<Loading />}>
            <SubmitContainer {...props} />
        </Bundle>
    )
}

const SubmissionList = lazy(() => import('layouts/min/SubmissionList'))

function Submissions({ location, navigate }) {
    const { days, types, regions, sorting } = utils.parse(location.search)
    const params = {
        days: utils.toNumber(days),
        types: utils.toSet(types),
        regions: utils.toSet(regions),
        sorting: utils.parseSorting(sorting),
    }
    async function handleParamsChange(moreParams) {
        const search = Object.assign({}, params, moreParams)
        const to = utils.stringify({
            ...search,
            sorting: search.sorting
                ? utils.formatSorting(search.sorting)
                : undefined,
        })

        await navigate(to)
    }

    return (
        <Bundle fallback={<Loading />}>
            <SubmissionList {...params} onParamsChange={handleParamsChange} />
        </Bundle>
    )
}
