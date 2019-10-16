import * as urls from '../urls/weather'
import fetch from 'utils/fetch'

export function stations() {
    return fetch(urls.stations()).then(stations => stations.sort(sorter))
}

export function station(id) {
    return fetch(urls.station(id))
}

export function measurements(stationId) {
    return fetch(urls.measurements(stationId))
}

// Utils
function sorter(a, b) {
    return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
}
