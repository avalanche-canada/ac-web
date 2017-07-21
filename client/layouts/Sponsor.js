import React from 'react'
import { Switch } from 'react-router-dom'
import { createRoute } from '~/router'
import Container from '~/containers/Sponsor'

export default function Sponsor() {
    return (
        <Switch>
            {ROUTES}
        </Switch>
    )
}

const MATCHES = new Map([
    ['/map/forecasts/kananaskis', 'kananaskis'],
    ['/map', 'Forecast'],
    ['/mountain-information-network', 'MIN'],
    ['/events/:uid', 'EventPage'],
    ['/events', 'EventIndex'],
    ['/news/:uid', 'NewsPage'],
    ['/news', 'NewsIndex'],
    ['/blogs/:uid', 'BlogPage'],
    ['/blogs', 'BlogIndex'],
    ['/forecasts/kananaskis', 'kananaskis'],
    ['/forecasts', 'Forecast'],
    ['/hot-zone-reports', 'Forecast'],
    ['/weather', 'Weather'],
    ['/training', 'Training'],
    ['/courses', 'TrainingCourses'],
    ['/instructing-ast', 'Training'],
    ['/youth', 'Youth'],
    ['/gear', 'Gear'],
])

const ROUTES = Array.from(MATCHES.keys()).map(path =>
    createRoute({ render, path })
)

function render({ match }) {
    const { path } = match

    return <Container name={MATCHES.get(path)} />
}
