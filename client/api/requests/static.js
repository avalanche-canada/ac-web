import * as urls from '../urls/static'
import fetch from 'utils/fetch'

export function resource(name) {
    return fetch(urls.resource(name))
}
