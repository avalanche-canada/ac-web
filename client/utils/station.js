import * as turf from '@turf/helpers'

export function title(station, status) {
    return station
        ? station.get('name')
        : status.isLoading ? 'Loading...' : 'No station'
}

export function geometry(station) {
    const coordinates = [station.get('longitude'), station.get('latitude')]

    return turf.geometry('Point', coordinates)
}

export function shareUrl(station) {
    return document.location.origin + link(station)
}

export function link(station) {
    const id = station.get('stationId')

    return `/weather/stations/${id}`
}
