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

export default ga

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
