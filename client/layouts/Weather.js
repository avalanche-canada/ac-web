import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import MountainWeather from './MountainWeather'
import WeatherStation from 'containers/WeatherStation'
import WeatherStationList from 'layouts/WeatherStationList'

Weather.propTypes = {
    match: PropTypes.object.isRequired,
}

function station({ match }) {
    return <WeatherStation id={match.params.id} />
}

export default function Weather({ match: { path } }) {
    return (
        <Switch>
            <Route path={`${path}/stations/:id`} render={station} />
            <Route path={`${path}/stations`} component={WeatherStationList} />
            <Route component={MountainWeather} />
        </Switch>
    )
}
