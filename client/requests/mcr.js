import { baseURL } from './config'
import fetch from 'utils/fetch'

export function report(id) {
    return fetch(URL + id + '/')
}

export function reports() {
    return fetch(URL)
}

// Constants
const URL = baseURL + '/mcr/'
