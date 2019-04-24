import { incidentsBaseUrl } from 'api/config'
import { get } from 'services/fetch/requests'
import { clean } from 'utils/object'

export function incident(id) {
    return get(`${BASE_URL}/${id}/`)
}

export function incidents(params) {
    return get(`${BASE_URL}/`, clean(params))
}

const BASE_URL = `${incidentsBaseUrl}/public/incidents`
