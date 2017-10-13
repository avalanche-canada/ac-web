import ga from 'react-ga'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import { googleAnalyticsId } from './config.json'

// Set in the google analytics custom dimentions
//  Needs to use the dimention<n> settings
//  it will be named correctly in the UI
const MAPBOXGL_SUPPORTED = 'dimension1'

const options = process.env.NODE_ENV === 'production' ? {} : { debug: true }

ga.initialize(googleAnalyticsId, options)

ga.set({
    [MAPBOXGL_SUPPORTED]: mapboxgl.supported(),
})

export default ga

// From: https://developers.google.com/analytics/devguides/collection/analyticsjs/events
export function handleOutboundSponsorClick(event) {
    ga.send('event', {
        eventCategory: 'Outbound Sponsor',
        eventAction: 'click',
        eventLabel: event.currentTarget.href,
        transport: 'beacon',
    })
}
