import { build } from 'utils/url'
import { baseURL } from 'api/config.json'

export function report(id) {
    return build(`${BASE_URL}/${id}`, { id, client })
}

export function reports(days = 7) {
    if (days <= 0) {
        throw new RangeError('Number of days must be higher or equal to 1.')
    }

    return build(BASE_URL, { client, last: `${days}:days` })
}

export function post() {
    return build(BASE_URL, { client })
}

const client = 'web'
const BASE_URL = `${baseURL}/min/submissions`
