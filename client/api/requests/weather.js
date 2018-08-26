import { weatherBaseUrl } from 'api/config.json'

export function stations() {
    return new Request(`${weatherBaseUrl}/stations/`)
}

export function station(id) {
    return new Request(`${weatherBaseUrl}/stations/${id}/`)
}

export function measurements(id) {
    return new Request(`${weatherBaseUrl}/stations/${id}/measurements/`)
}
