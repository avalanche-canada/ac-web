import React, { PureComponent } from 'react'
import { Router } from '@reach/router'
import { Pending, Fulfilled } from 'components/fetch'
import { Page, Main, Content, Header } from 'components/page'
import { Loading } from 'components/text'
import * as c from 'components/incidents'
import * as containers from 'containers/incidents'
import format from 'date-fns/format'

export default function Incidents() {
    return (
        <Page>
            <Header title="Historical Incidents" />
            <Content>
                <Main>
                    <Router>
                        <IncidentsList path="/" />
                        <IncidentDetails path=":id" />
                    </Router>
                </Main>
            </Content>
        </Page>
    )
}

class IncidentsList extends PureComponent {
    state = {
        filters: {},
        page: 1,
    }
    get params() {
        const { filters, ...params } = this.state
        const { from, to } = filters

        if (from) {
            params.from = seasonToFrom(from)
        }

        if (to) {
            params.to = seasonToTo(to)
        }

        return params
    }
    handlePageChange = page => {
        this.setState({ page })
    }
    handlerFiltersChange = filters => {
        this.setState({
            filters,
            page: 1,
        })
    }
    render() {
        return (
            <containers.Incidents {...this.params}>
                <Pending>
                    <Loading />
                </Pending>
                <Fulfilled>
                    <c.IncidentTable
                        {...this.state}
                        onPageChange={this.handlePageChange}
                        onFilterChange={this.handlerFiltersChange}
                    />
                </Fulfilled>
            </containers.Incidents>
        )
    }
}

function IncidentDetails({ id }) {
    return (
        <containers.Incident id={id}>
            <Pending>
                <Loading />
            </Pending>
            <Fulfilled>
                <c.IncidentDetails />
            </Fulfilled>
        </containers.Incident>
    )
}

/*
 * TODO(wnh): This is SOOOO gross. I feel dirty.
 */
// Utils
const seasonToFrom = s => {
    if (s === 1980) {
        return '0001-01-01'
    } else {
        return format(new Date(s, 5, 1), 'YYYY-MM-DD')
    }
}
const seasonToTo = s => format(new Date(s + 1, 4, 30), 'YYYY-MM-DD')
