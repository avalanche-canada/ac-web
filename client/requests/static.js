import { path } from 'utils/url'
import { staticBaseURL } from './config.json'
import fetch from 'utils/fetch'

export function resource(name) {
    return fetch(path(staticBaseURL, name + '.json'))
}
