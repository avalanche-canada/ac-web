import { Component } from 'react'
import PropTypes from 'prop-types'
import ga from 'react-ga'
import supported from '@mapbox/mapbox-gl-supported'
import { googleAnalyticsId } from './config.json'

// Set in the google analytics custom dimentions
//  Needs to use the dimention<n> settings
//  it will be named correctly in the UI
const MAPBOXGL_SUPPORTED = 'dimension1'

const options = process.env.NODE_ENV === 'production' ? {} : { debug: true }

ga.initialize(googleAnalyticsId, options)

ga.set({
    [MAPBOXGL_SUPPORTED]: supported(),
})

// From: https://developers.google.com/analytics/devguides/collection/analyticsjs/events
export function handleOutboundSponsorClick(event) {
    ga.event({
        category: 'Navigation',
        action: 'Outbound Sponsor',
        label: event.currentTarget.href,
        transport: 'beacon',
    })
}

export function handleForecastTabActivate(label) {
    ga.event({
        category: 'Navigation',
        action: 'Forecast Tab activation',
        label,
    })
}

export function notFound({ pathname }) {
    ga.event({
        category: 'Navigation',
        action: 'Not Found',
        label: pathname,
        nonInteraction: true,
    })
}

export default class Analytics extends Component {
    static propTypes = {
        location: PropTypes.object.isRequired,
        children: PropTypes.element,
    }
    log() {
        ga.pageview(this.props.location.pathname)
    }
    componentDidMount() {
        this.log()
    }
    componentDidUpdate({ location }) {
        if (this.props.location.pathname !== location.pathname) {
            this.log()
        }
    }
    render() {
        return this.props.children
    }
}
