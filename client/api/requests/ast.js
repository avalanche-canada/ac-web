import { astBaseUrl } from 'api/config.json'
import { get } from 'services/fetch/requests'

export function providers() {
    return get(`${astBaseUrl}/providers`, PARAMS)
}

export function courses() {
    return get(`${astBaseUrl}/courses`, PARAMS)
}

const PARAMS = {
    page_size: 1000,
}
