import { baseURL } from 'api/config.json'

export function reports() {
    return new Request(`${baseURL}/mcr/`)
}
