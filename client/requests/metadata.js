import { baseURL } from './config.json'
import fetch from 'utils/fetch'

export function metadata() {
    return fetch(baseURL + '/features/metadata')
}
