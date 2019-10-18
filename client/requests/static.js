import { staticBaseURL } from './config.json'
import fetch from 'utils/fetch'

export function resource(name) {
    return fetch(staticBaseURL + `/${name}.json`)
}
