import { incidentsBaseUrl } from 'api/config'
import { status } from './utils'
import * as requests from './requests'

const BASE_URL = `${incidentsBaseUrl}/public/incidents`

export async function getById(id) {
    const request = requests.get(`${BASE_URL}/${id}/`)
    const response = await fetch(request)

    return await status(response)
}

export async function get(params) {
    const request = requests.get(`${BASE_URL}/`, { params })
    const response = await fetch(request)

    return await status(response)
}
