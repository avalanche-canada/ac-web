import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import Bundle from 'components/Bundle'
import loadMountainWeather from 'bundle-loader?lazy!./forecast/MountainWeather'
import WeatherStation from './station/WeatherStation'
import WeatherStationList from './station/WeatherStationList'

Weather.propTypes = {
    match: PropTypes.object.isRequired,
}

export default function Weather({ match: { path } }) {
    return (
        <Switch>
            <Route path={`${path}/stations/:id`} render={station} />
            <Route path={`${path}/stations`} component={WeatherStationList} />
            <Route render={mountainWeather} />
        </Switch>
    )
}

// Renderers
function station({ match }) {
    return <WeatherStation id={match.params.id} />
}
function mountainWeather(props) {
    return (
        <Bundle load={loadMountainWeather}>
            {Component => (Component ? <Component {...props} /> : null)}
        </Bundle>
    )
}
