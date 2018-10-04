import React, { PureComponent, Fragment } from 'react'
import { Pending, Fulfilled } from 'components/fetch'
import { Loading } from 'components/text'
import * as components from 'components/incidents'
import * as containers from 'containers/incidents'
import Pagination from 'components/pagination'
import format from 'date-fns/format'

export class IncidentsList extends PureComponent {
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
    renderPagination = ({ count }) => (
        <Pagination
            total={count / 50}
            active={this.state.page}
            onChange={this.handlePageChange}
        />
    )
    render() {
        const { filters } = this.state

        return (
            <Fragment>
                <components.IncidentFilters
                    values={filters}
                    onChange={this.handlerFiltersChange}
                />
                <containers.Incidents {...this.params}>
                    <Pending>
                        <Loading />
                    </Pending>
                    <Fulfilled>
                        <components.IncidentTable />
                    </Fulfilled>
                    <Fulfilled>{this.renderPagination}</Fulfilled>
                </containers.Incidents>
            </Fragment>
        )
    }
}

export function IncidentDetails({ id }) {
    return (
        <containers.Incident id={id}>
            <Pending>
                <Loading />
            </Pending>
            <Fulfilled>
                <components.IncidentDetails />
            </Fulfilled>
        </containers.Incident>
    )
}

// Utils
/*
 * TODO(wnh): This is SOOOO gross. I feel dirty.
 */
function seasonToFrom(season) {
    if (season === 1980) {
        return '0001-01-01'
    } else {
        return format(new Date(season, 5, 1), 'YYYY-MM-DD')
    }
}
function seasonToTo(season) {
    return format(new Date(season + 1, 4, 30), 'YYYY-MM-DD')
}