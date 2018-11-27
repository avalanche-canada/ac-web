import { get } from 'services/fetch/requests'
import * as Predicates from 'prismic/predicates'
import { root, version } from './config.json'

export function api() {
    return get(`${root}/${version}`)
}

export function search(ref, predicates = [], options = {}) {
    const params = serializeParams({
        page: 1,
        ...options,
        q: `[${predicates.map(Predicates.toQuery).join('')}]`,
        ref,
    })
    return get(`${root}/${version}/documents/search?${params}`)
}

// Utils
// TODO: Could potentally use URLSearchParams and leave get function taking care if everything
function serializeParams(params) {
    return Object.entries(params)
        .filter(tuple => Boolean(tuple[1]))
        .map(([key, value]) => {
            if (Array.isArray(value)) {
                const content = value.map(encodeURIComponent).join(',')

                return `${key}=[${content}]`
            } else {
                return `${key}=${encodeURIComponent(value)}`
            }
        })
        .join('&')
}
