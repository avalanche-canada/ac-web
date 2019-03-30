import React, { useState, Fragment } from 'react'
import { Router } from '@reach/router'
import format from 'date-fns/format'
import { Pending, Fulfilled } from 'components/fetch'
import * as components from 'components/incidents'
import * as containers from 'containers/incidents'
import { Loading, Warning } from 'components/text'
import Pagination from 'components/pagination'

export default function Layout() {
    return (
        <Router>
            <IncidentsList path="/" />
            <IncidentDetails path=":id" />
        </Router>
    )
}

function IncidentsList() {
    const [page, setPage] = useState(1)
    const [filters, setFilters] = useState({})
    const { from, to } = filters
    function handlerFiltersChange(filters) {
        setFilters(filters)
        setPage(1)
    }

    return (
        <Fragment>
            <components.IncidentFilters
                values={filters}
                onChange={handlerFiltersChange}
            />
            <containers.Incidents
                page={page}
                from={from ? seasonToFrom(from) : undefined}
                to={to ? seasonToTo(to) : undefined}>
                <Pending>
                    <Loading />
                </Pending>
                <Fulfilled>
                    <components.IncidentTable />
                </Fulfilled>
                <Fulfilled>
                    {({ count }) => (
                        <Pagination
                            total={count / 50}
                            active={page}
                            onChange={setPage}
                        />
                    )}
                </Fulfilled>
            </containers.Incidents>
        </Fragment>
    )
}

function IncidentDetails({ id }) {
    return (
        <containers.Incident id={id}>
            <Pending>
                <Loading />
            </Pending>
            <Fulfilled.Found>
                <components.IncidentDetails />
            </Fulfilled.Found>
            <Fulfilled.NotFound>
                <Warning>Incident #{id} not found</Warning>
            </Fulfilled.NotFound>
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
