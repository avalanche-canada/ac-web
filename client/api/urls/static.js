import { build } from 'utils/url'
import { staticBaseURL } from 'api/config.json'

export function resource(name) {
    return build(`/${name}.json`, null, staticBaseURL)
}
