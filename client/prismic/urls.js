import * as Predicates from 'prismic/predicates'
import { root, version } from './config.json'

export function api() {
    return `${root}/${version}`
}

export function search(ref, predicates = [], options = {}) {
    const params = serializeParams({
        page: 1,
        ...options,
        q: `[${predicates.map(Predicates.toQuery).join('')}]`,
        ref,
    })

    return `${api()}/documents/search?${params}`
}

// Utils
function serializeParams(params) {
    const query = new URLSearchParams(params)

    // Prismic API requires the array to be encoded differently!
    for (const key of query.keys()) {
        if (Array.isArray(params[key])) {
            query.set(key, `[${query.getAll(key).join(',')}]`)
        }
    }

    return query.toString()
}
