import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { supported } from 'utils/mapbox'
import { useLocation } from 'router/hooks'

// From: https://developers.google.com/analytics/devguides/collection/analyticsjs/events
export function handleOutboundSponsorClick(event) {
    navigation('Outbound Sponsor', event.currentTarget.href)
}

export function handleForecastTabActivate(index) {
    navigation('Forecast Tab activation', HEADERS[index])
}

export function notFound({ pathname }) {
    navigation('Not Found', pathname, { nonInteraction: true })
}

Analytics.propTypes = {
    children: PropTypes.element.isRequired,
}

export default function Analytics({ children }) {
    const { location } = useLocation()
    useEffect(() => {
        ga('set', 'transport', 'beacon')
        ga('set', MAPBOXGL_SUPPORTED, supported().toString())
    }, [])

    useEffect(() => {
        ga('send', 'pageview', location.pathname)
    }, [location.pathname])

    return children
}

// Utils and constants
const { ga } = window
const HEADERS = ['Danger ratings', 'Problems', 'Details']
const MAPBOXGL_SUPPORTED = 'dimension1'
function navigation(...args) {
    ga('send', 'event', 'Navigation', ...args)
}
