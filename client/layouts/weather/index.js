import React, { lazy } from 'react'
import { Router, Redirect } from '@reach/router'
import Bundle from 'components/Bundle'
import WeatherStation from './station/WeatherStation'
import WeatherStationList from './station/WeatherStationList'

export default function Weather() {
    return (
        <Router>
            <Redirect from="/" to="weather/forecast" />
            <MountainWeatherForecast path="forecast/*" />
            <WeatherStationList path="stations" />
            <WeatherStation path="stations/:id" />
        </Router>
    )
}

// Subroutes
const MountainWeather = lazy(() => import('./forecast/MountainWeather'))

// TODO: Does not make sense to bundle...most of our users come here!!!
function MountainWeatherForecast(props) {
    return (
        <Bundle>
            <MountainWeather {...props} />
        </Bundle>
    )
}
