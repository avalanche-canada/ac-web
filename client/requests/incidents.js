import { incidentsBaseUrl } from './config'
import { appendParams } from 'utils/url'
import fetch from 'utils/fetch'

export function incident(id) {
    return fetch(URL + id + '/')
}

export function incidents(page, from, to) {
    return fetch(appendParams(URL, { page, from, to }))
}

// Constants
const URL = incidentsBaseUrl + '/public/incidents/'
