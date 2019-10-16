import { build } from 'utils/url'
import { staticBaseURL } from './config.json'

export function resource(name) {
    return build(`/${name}.json`, null, staticBaseURL)
}
