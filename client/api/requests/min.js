import * as requests from 'services/fetch/requests'
import AuthAccessor from 'services/auth/accessor'
import { baseURL } from 'api/config.json'

export function report(id) {
    return requests.get(`${BASE_URL}/${id}`, { id, client })
}

export function reports(days = 7) {
    if (days <= 0) {
        throw new Error('Number of days must be higher or equal to 1.')
    }

    return requests.get(BASE_URL, { client, last: `${days}:days` })
}

export function post(data) {
    const { idToken } = AuthAccessor.create()
    const config = {
        body: data,
        headers: new Headers({
            Authorization: `Bearer ${idToken}`,
        }),
    }

    return requests.post(BASE_URL, { client }, config)
}

const client = 'web'
const BASE_URL = `${baseURL}/min/submissions`
