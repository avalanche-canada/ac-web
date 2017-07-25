import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import Container from '~/containers/Sponsor'

Sponsor.propTypes = {
    label: PropTypes.string,
}

export default function Sponsor({ label }) {
    function render({ match }) {
        const { url, path } = match
        const name = MATCHES.get(url) || MATCHES.get(path)

        return name ? <Container name={name} label={label} /> : null
    }

    return <Route render={render} />
}

const MATCHES = new Map([
    ['/map/forecasts/kananaskis', 'kananaskis'],
    ['/map/forecasts/:name', 'Forecast'],
    ['/map/hot-zone-reports/:name', 'Forecast'],
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
