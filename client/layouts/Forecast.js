import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import Forecast from 'layouts/pages/Forecast'
import NorthRockies from 'layouts/pages/NorthRockies'
import ForecastRegionList from 'layouts/ForecastRegionList'
import ArchiveForecast from 'layouts/pages/ArchiveForecast'
import isAfter from 'date-fns/is_after'
import isValid from 'date-fns/is_valid'
import isPast from 'date-fns/is_past'
import isToday from 'date-fns/is_today'
import endOfYesterday from 'date-fns/end_of_yesterday'
import externals, { open } from 'router/externals'
import * as utils from 'utils/search'

ForecastLayout.propTypes = {
    match: PropTypes.object.isRequired,
}

export default function ForecastLayout({ match }) {
    const { path } = match

    return (
        <Switch>
            <Route path={`${path}/archives/:name?/:date?`} render={archive} />
            <Route path={`${path}/north-rockies`} component={NorthRockies} />
            <Route path={`${path}/:name/:date?`} render={forecast} />
            <Route path={path} component={ForecastRegionList} />
        </Switch>
    )
}

// Renderers
function archive({ match, history }) {
    const { name, date } = match.params

    if (name && date) {
        open(name, date)
    }

    if (date && isAfter(utils.parseDate(date), endOfYesterday())) {
        return <Redirect to={`/forecasts/${name}`} push={false} />
    }

    function onParamsChange({ name, date }) {
        const paths = [
            '/forecasts/archives',
            name,
            date && utils.formatDate(date),
        ].filter(Boolean)

        history.push(paths.join('/'))
    }

    return (
        <ArchiveForecast
            name={name}
            date={utils.parseDate(date)}
            onParamsChange={onParamsChange}
        />
    )
}

function forecast({ match }) {
    const { name, date } = match.params

    if (externals.has(name)) {
        open(name)

        return <Redirect to="/forecasts" push={false} />
    }

    if (typeof date === 'string') {
        const parsed = utils.parseDate(date)

        if (isValid(parsed)) {
            if (isToday(parsed)) {
                return <Redirect to={`/forecasts/${name}`} push={false} />
            } else if (isPast(parsed)) {
                return (
                    <Redirect
                        to={`/forecasts/archives/${name}/${date}`}
                        push={false}
                    />
                )
            } else {
                throw new Error(`There is no ${name} bulletin date ${date}.`)
            }
        }
    }

    return <Forecast name={name} />
}
