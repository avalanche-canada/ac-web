import { incidentsBaseUrl } from 'api/config'
import { get } from 'services/fetch/requests'

export function incident(id) {
    return get(`${BASE_URL}/${id}/`)
}

export function incidents(params) {
    return get(`${BASE_URL}/`, params)
}

const BASE_URL = `${incidentsBaseUrl}/public/incidents`
