import React, { useState, useMemo, Fragment } from 'react'
import { Router } from '@reach/router'
import format from 'date-fns/format'
import * as components from 'components/incidents'
import * as hooks from 'hooks/async/incidents'
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
    const from = filters.from ? seasonToFrom(filters.from) : undefined
    const to = filters.to ? seasonToTo(filters.to) : undefined
    const [payload, pending] = hooks.useIncidents(page, from, to)
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
            {pending ? (
                <Loading />
            ) : (
                <Fragment>
                    <components.IncidentTable incidents={payload.results} />
                    <Pagination
                        total={payload.count / 50}
                        active={page}
                        onChange={setPage}
                    />
                </Fragment>
            )}
        </Fragment>
    )
}

function IncidentDetails({ id }) {
    const [incident, pending] = hooks.useIncident(id)

    return pending ? (
        <Loading />
    ) : incident ? (
        <components.IncidentDetails data={incident} />
    ) : (
        <Warning>Incident #{id} not found</Warning>
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
