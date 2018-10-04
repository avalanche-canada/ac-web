import React, { Component } from 'react'
import { Router } from '@reach/router'
import { Protected } from 'router'
import Bundle from 'components/Bundle'
import loadSubmit from 'bundle-loader?lazy!containers/min/Form'
import Submission from 'layouts/Submission'
import SubmissionList from 'layouts/SubmissionList'
import { Loading } from 'components/text'
import { StaticPage } from 'prismic/layouts'
import { Page, Content } from 'components/page'
import * as utils from 'utils/search'

export default function MountainInformationNetwork() {
    return (
        <Router>
            <Protected path="submit" component={Submit} />
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

function Submit(props) {
    return (
        <Bundle load={loadSubmit}>
            {module =>
                module ? (
                    <module.default {...props} />
                ) : (
                    <Page>
                        <Content>
                            <h1>
                                <Loading />
                            </h1>
                        </Content>
                    </Page>
                )
            }
        </Bundle>
    )
}

class Submissions extends Component {
    handleParamsChange = params => {
        const to = utils.stringify({
            ...params,
            sorting: utils.formatSorting(params.sorting),
        })

        this.props.navigate(to)
    }
    render() {
        const { search } = this.props.location
        const { days, types, regions, sorting } = utils.parse(search)

        return (
            <SubmissionList
                days={utils.toNumber(days)}
                types={utils.toSet(types)}
                regions={utils.toSet(regions)}
                sorting={utils.parseSorting(sorting)}
                onParamsChange={this.handleParamsChange}
            />
        )
    }
}
