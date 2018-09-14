import { baseURL } from 'api/config.json'

export function report(id) {
    return new Request(`${baseURL}/mcr/${id}/`)
}

export function reports() {
    return new Request(`${baseURL}/mcr/`)
}
