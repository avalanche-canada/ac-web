import { incidentsBaseUrl } from 'api/config'
import { status } from './utils'
import * as requests from './requests'

const BASE_URL = `${incidentsBaseUrl}/public/incidents`

export function getById(id) {
    const request = requests.get(`${BASE_URL}/${id}/`)

    return fetch(request).then(status)
}

export function get(params) {
    const request = requests.get(`${BASE_URL}/`, params)

    return fetch(request).then(status)
}
