import * as urls from '../urls/incidents'
import fetch from 'utils/fetch'

export function incident(id) {
    return fetch(urls.incident(id))
}

export function incidents(params) {
    return fetch(urls.incidents(params))
}
