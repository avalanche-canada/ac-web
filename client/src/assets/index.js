import {domain} from './config.json'

export function url(asset) {
    return `${domain}${asset}`
}
