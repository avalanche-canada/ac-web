import * as turf from '@turf/helpers'

export function title({ data, pending }) {
    return pending ? 'Loading...' : data?.name || 'Weather station not found'
}

export function geometry({ longitude, latitude }) {
    return turf.point([longitude, latitude])
}

export function path(stationId) {
    return `/weather/stations/${stationId}`
}
