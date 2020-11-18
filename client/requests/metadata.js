import { baseURL } from './config'
import fetch from 'utils/fetch'

export function metadata() {
    return fetch(baseURL + '/features/metadata')
}
