import React, { lazy } from 'react'
import { Router, Redirect } from '@reach/router'
import isAfter from 'date-fns/is_after'
import isValid from 'date-fns/is_valid'
import isPast from 'date-fns/is_past'
import endOfYesterday from 'date-fns/end_of_yesterday'
import Forecast from 'layouts/pages/Forecast'
import ForecastRegionList from 'layouts/ForecastRegionList'
import Bundle from 'components/Bundle'
import { DateParam } from 'hooks/params'
import { path } from 'utils/url'

export default function ForecastLayout() {
    return (
        <Router>
            <ForecastRegionList path="/" />
            <ForecastRoute path=":name" />
            <ForecastRoute path=":name/:date" />
            <ArchiveForecastRoute path="archives" />
            <ArchiveForecastRoute path="archives/:date" />
        </Router>
    )
}

// Subroutes
function ForecastRoute({ name, date }) {
    if (typeof date === 'string') {
        const parsed = DateParam.parse(date)

        if (isValid(parsed)) {
            if (isPast(parsed)) {
                return <Redirect to={'/forecasts/archives/' + date} />
            }

            return <Redirect to="/forecasts" />
        }
    }

    return <Forecast name={name} />
}
const ArchiveForecast = lazy(() => import('layouts/pages/ArchiveForecast'))

function ArchiveForecastRoute({ date, navigate }) {
    const parsed = DateParam.parse(date)

    if (parsed && isAfter(parsed, endOfYesterday())) {
        return <Redirect to="/forecasts" />
    }
    function handleDateChange(date) {
        navigate(path('/forecasts/archives', DateParam.format(date)))
    }

    return (
        <Bundle>
            <ArchiveForecast date={parsed} onDateChange={handleDateChange} />
        </Bundle>
    )
}
