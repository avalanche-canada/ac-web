import { get } from 'services/fetch/requests'
import { baseURL } from 'api/config.json'

export function report(id) {
    return get(`${baseURL}/mcr/${id}/`)
}

export function reports() {
    return get(`${baseURL}/mcr/`)
}
