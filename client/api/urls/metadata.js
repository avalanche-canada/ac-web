import { build } from 'utils/url'
import { baseURL } from './config.json'

export function metadata() {
    return build('/features/metadata', null, baseURL)
}
