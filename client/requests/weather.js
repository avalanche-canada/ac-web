import { weatherBaseUrl } from './config.json'
import fetch from 'utils/fetch'

export function stations() {
    return fetch(URL).then(stations => stations.sort(sorter))
}

export function station(id) {
    const url = URL + id + '/'

    return fetch(url)
}

export function measurements(stationId) {
    const url = URL + stationId + '/measurements/'

    return fetch(url)
}

// Utils & constants
function sorter(a, b) {
    return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
}
const URL = weatherBaseUrl + '/stations/'
