import * as urls from '../urls/mcr'
import fetch from 'utils/fetch'

export function report(id) {
    return fetch(urls.report(id))
}

export function reports() {
    return fetch(urls.reports())
}
