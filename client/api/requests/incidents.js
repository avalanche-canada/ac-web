import { incidentsBaseUrl } from 'api/config'
import * as requests from 'services/fetch/requests'

export function incident(id) {
    return requests.get(`${BASE_URL}/${id}/`)
}

export function incidents(params) {
    return requests.get(`${BASE_URL}/`, params)
}

const BASE_URL = `${incidentsBaseUrl}/public/incidents`
