import { get } from 'services/fetch/requests'
import { weatherBaseUrl } from 'api/config.json'

export function stations() {
    return get(`${weatherBaseUrl}/stations/`)
}

export function station(id) {
    return get(`${weatherBaseUrl}/stations/${id}/`)
}

export function measurements(id) {
    return get(`${weatherBaseUrl}/stations/${id}/measurements/`)
}
