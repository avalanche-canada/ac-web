import { astBaseUrl } from 'api/config.json'

export function providers() {
    return new Request(`${astBaseUrl}/providers`)
}

export function courses() {
    return new Request(`${astBaseUrl}/courses`)
}
