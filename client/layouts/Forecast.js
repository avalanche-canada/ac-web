import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import Forecast from 'containers/Forecast'
import ForecastRegionList from 'layouts/ForecastRegionList'
import ArchiveForecast from 'containers/ArchiveForecast'
import parseDate from 'date-fns/parse'
import isAfter from 'date-fns/is_after'
import endOfYesterday from 'date-fns/end_of_yesterday'
import externals from 'router/externals'
import URL from 'url'

ForecastLayout.propTypes = {
    match: PropTypes.object.isRequired,
}

function archive({ match: { params } }) {
    const { name, date } = params

    if (externals.has(name) && date && name) {
        const url = URL.parse(externals.get(name), true)

        url.query.d = date

        delete url.search

        window.open(URL.format(url), name)
    }

    if (date && isAfter(parseDate(date, 'YYYY-MM-DD'), endOfYesterday())) {
        return <Redirect to={`/forecasts/${name}`} push={false} />
    }

    return <ArchiveForecast {...params} />
}

function forecast({ match }) {
    const { name } = match.params

    if (externals.has(name)) {
        window.open(externals.get(name), name)

        return <Redirect to="/forecasts" />
    }

    return <Forecast {...match.params} />
}

export default function ForecastLayout({ match }) {
    const { path } = match

    return (
        <Switch>
            <Route path={`${path}/archives/:name?/:date?`} render={archive} />
            <Route path={`${path}/:name/:date?`} render={forecast} />
            <Route path={path} component={ForecastRegionList} />
        </Switch>
    )
}
