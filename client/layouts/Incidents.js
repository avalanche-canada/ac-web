import React, { PureComponent } from 'react'
import { Router } from '@reach/router'
import { Page, Main, Content, Header } from 'components/page'
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
    renderContent = ({ data, pending, fulfilled }) => {
        const status = (pending && PENDING) || (fulfilled && FULFILLED)

        return (
            <c.IncidentList
                {...this.state}
                data={data}
                status={status}
                onPageChange={this.handlePageChange}
                onFilterChange={this.handlerFiltersChange}
            />
        )
    }
    render() {
        return (
            <containers.Incidents {...this.params}>
                {this.renderContent}
            </containers.Incidents>
        )
    }
}

class IncidentDetails extends PureComponent {
    renderContent = ({ data, pending, fulfilled, rejected }) => {
        const status = (pending && PENDING) || (fulfilled && FULFILLED)

        return <c.IncidentDetails status={status} data={data} />
    }
    render() {
        return (
            <containers.Incident id={this.props.id}>
                {this.renderContent}
            </containers.Incident>
        )
    }
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

// Constants
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
