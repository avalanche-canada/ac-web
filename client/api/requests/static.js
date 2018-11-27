import { get } from 'services/fetch/requests'
import { staticBaseURL } from 'api/config.json'

export function resource(name) {
    return get(`${staticBaseURL}/${name}.json`)
}
