import * as turf from '@turf/helpers'

export function title({ data, loading }) {
    return loading ? 'Loading...' : data?.name || 'Weather station not found'
}

export function geometry({ longitude, latitude }) {
    return turf.point([longitude, latitude])
}

export function shareUrl(station) {
    return document.location.origin + link(station)
}

export function link({ stationId }) {
    return `/weather/stations/${stationId}`
}
