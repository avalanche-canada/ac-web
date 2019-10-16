import { build } from 'utils/url'
import { baseURL } from './config.json'

export function report(id) {
    return reports() + id + '/'
}

export function reports() {
    return build('/mcr/', null, baseURL)
}
