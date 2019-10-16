import { astBaseUrl } from './config.json'
import { build } from 'utils/url'

export function providers() {
    return build('/providers', PARAMS, astBaseUrl)
}

export function courses() {
    return build('/courses', PARAMS, astBaseUrl)
}

const PARAMS = {
    page_size: 1000,
}
