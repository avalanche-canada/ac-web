import { astBaseUrl } from 'api/config.json'
import { get } from 'services/fetch/requests'

export function providers(params) {
    return get(`${astBaseUrl}/providers`, params)
}

export function courses(params) {
    return get(`${astBaseUrl}/courses`, params)
}
