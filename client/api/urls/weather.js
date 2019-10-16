import { build } from 'utils/url'
import { weatherBaseUrl } from './config.json'

export function stations() {
    return build('/stations/', null, weatherBaseUrl)
}

export function station(id) {
    return stations() + id + '/'
}

export function measurements(stationId) {
    return station(stationId) + 'measurements/'
}
