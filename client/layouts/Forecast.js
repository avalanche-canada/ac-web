import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import Forecast from '~/containers/Forecast'
import Forecasts from '~/containers/Forecasts'
import ArchiveForecast from '~/containers/ArchiveForecast'
import parseDate from 'date-fns/parse'
import isAfter from 'date-fns/is_after'
import endOfYesterday from 'date-fns/end_of_yesterday'

ForecastLayout.propTypes = {
    match: PropTypes.object.isRequired,
}

function archive({ match: { params }, history }) {
    const { name, date } = params

    if (date && isAfter(parseDate(date, 'YYYY-MM-DD'), endOfYesterday())) {
        history.replace(`/forecasts/${name}`)
    }

    return <ArchiveForecast {...params} />
}

function forecast({ match }) {
    return <Forecast {...match.params} />
}

export default function ForecastLayout({ match }) {
    const { path } = match

    return (
        <Switch>
            <Route path={`${path}/archives/:name?/:date?`} render={archive} />
            <Route path={`${path}/:name/:date?`} render={forecast} />
            <Route path={path} component={Forecasts} />
        </Switch>
    )
}
