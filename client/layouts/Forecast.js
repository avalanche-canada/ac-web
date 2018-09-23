import React from 'react'
import { Router, Redirect, navigate } from '@reach/router'
import Forecast from 'layouts/pages/Forecast'
import NorthRockies from 'layouts/pages/NorthRockies'
import ForecastRegionList from 'layouts/ForecastRegionList'
import ArchiveForecast from 'layouts/pages/ArchiveForecast'
import parse from 'date-fns/parse'
import isAfter from 'date-fns/is_after'
import isValid from 'date-fns/is_valid'
import isPast from 'date-fns/is_past'
import endOfYesterday from 'date-fns/end_of_yesterday'
import externals, { open } from 'router/externals'
import * as utils from 'utils/search'

export default function ForecastLayout() {
    return (
        <Router>
            <ForecastRegionList path="/" />
            <NorthRockies path="north-rockies" />
            <ArchiveForecastRoute path="archives" />
            <ArchiveForecastRoute path="archives/:name" />
            <ArchiveForecastRoute path="archives/:name/:date" />
            <ForecastRoute path=":name" />
            <ForecastRoute path=":name/:date" />
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

    return <Forecast name={name} />
}
function ArchiveForecastRoute({ name, date }) {
    if (date && isAfter(parse(date), endOfYesterday())) {
        return <Redirect to={`/forecasts/${name}`} />
    }

    if (name && date) {
        open(name, date)
    }

    return (
        <ArchiveForecast
            name={name}
            date={utils.parseDate(date)}
            onParamsChange={handleParamsChange}
        />
    )
}

// Utils
function handleParamsChange({ name, date }) {
    const path = [name, utils.formatDate(date)].filter(Boolean).join('/')

    navigate(`/forecasts/archives/${path}`)
}
