import { build } from 'utils/url'
import { baseURL } from 'api/config.json'

export function metadata() {
    return build('/features/metadata', null, baseURL)
}
