import React, { lazy } from 'react'
import { Router, Redirect } from '@reach/router'
import parse from 'date-fns/parse'
import isAfter from 'date-fns/is_after'
import isValid from 'date-fns/is_valid'
import isPast from 'date-fns/is_past'
import endOfYesterday from 'date-fns/end_of_yesterday'
import Forecast from 'layouts/pages/Forecast'
import ForecastRegionList from 'layouts/ForecastRegionList'
import Bundle from 'components/Bundle'
import externals, { open } from 'router/externals'
import { DateParam } from 'hooks/params'
import { path } from 'utils/url'
import { GenericPage } from 'prismic/layouts'

export default function ForecastLayout() {
    return (
        <Router>
            <ForecastRegionList path="/" />
            <Forecast name="kananaskis" path="kananaskis" />
            <ForecastRoute path=":name" />
            <ForecastRoute path=":name/:date" />
            <ArchiveForecastRoute path="archives" />
            <ArchiveForecastRoute path="archives/:name" />
            <ArchiveForecastRoute path="archives/:name/:date" />
        </Router>
    )
}

// Subroutes
function ForecastRoute({ name, date }) {
    if (externals.has(name)) {
        open(name)

        return <Redirect to="/forecasts" />
    }

    if (typeof date === 'string') {
        const parsed = parse(date)

        if (isValid(parsed)) {
            if (isPast(parsed)) {
                return <Redirect to={`/forecasts/archives/${name}/${date}`} />
            }

            return <Redirect to={`/forecasts/${name}`} />
        }
    }

    return <GenericPage uid="fx-shutdown-covid" />
}
const ArchiveForecast = lazy(() => import('layouts/pages/ArchiveForecast'))
function ArchiveForecastRoute({ name, date, navigate }) {
    if (date && isAfter(parse(date), endOfYesterday())) {
        return <Redirect to={`/forecasts/${name}`} />
    }

    if (name && date) {
        open(name, date)
    }

    function handleParamsChange({ name, date }) {
        navigate(path('/forecasts/archives', name, DateParam.format(date)))
    }

    return (
        <Bundle>
            <ArchiveForecast
                name={name}
                date={DateParam.parse(date)}
                onParamsChange={handleParamsChange}
            />
        </Bundle>
    )
}
