import { build } from 'utils/url'
import { baseURL } from './config.json'

export function report(id) {
    return build(`${PATH}/${id}`, { id, client }, baseURL)
}

export function reports(days = 7) {
    if (days <= 0) {
        throw new RangeError('Number of days must be higher or equal to 1.')
    }

    return build(PATH, { client, last: `${days}:days` }, baseURL)
}

export function post() {
    return build(PATH, { client }, baseURL)
}

const client = 'web'
const PATH = '/min/submissions'
