import React from 'react'
import { Router, Redirect } from '@reach/router'
import Bundle from 'components/Bundle'
import loadMountainWeather from 'bundle-loader?lazy!./forecast/MountainWeather'
import WeatherStation from './station/WeatherStation'
import WeatherStationList from './station/WeatherStationList'

export default function Weather() {
    return (
        <Router>
            <Redirect from="/" to="weather/forecast" />
            <MountainWeather path="forecast/*" />
            <WeatherStationList path="stations" />
            <WeatherStation path="stations/:id" />
        </Router>
    )
}

// Subroutes
function MountainWeather(props) {
    return (
        <Bundle load={loadMountainWeather}>
            {module => (module ? <module.default {...props} /> : null)}
        </Bundle>
    )
}
