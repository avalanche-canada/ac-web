import { build } from 'utils/url'
import { baseURL } from './config.json'
import fetch from 'utils/fetch'

export function report(id) {
    const url = URL + id + '/'

    return fetch(url)
}

export function reports() {
    return fetch(URL)
}

// Constants
const URL = build('/mcr/', null, baseURL)
