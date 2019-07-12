import { incidentsBaseUrl } from 'api/config'
import { build } from 'utils/url'

export function incident(id) {
    return `${incidents()}${id}/`
}

export function incidents(params) {
    return build('/public/incidents/', params, incidentsBaseUrl)
}
