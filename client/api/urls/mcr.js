import { build } from 'utils/url'
import { baseURL } from 'api/config.json'

export function report(id) {
    return `${reports()}${id}/`
}

export function reports() {
    return build(`${baseURL}/mcr/`)
}
