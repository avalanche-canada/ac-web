import { staticBaseURL } from 'api/config.json'

export function resource(name) {
    return new Request(`${staticBaseURL}/${name}.json`)
}
