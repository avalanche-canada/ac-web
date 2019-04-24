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
function serializeParams(params) {
    const query = new URLSearchParams(params)

    // Prismic API requires the array to be encoded differently!
    // TODO Look if there is a better to implement that or look at PRismic docs
    for (const key of query.keys()) {
        if (Array.isArray(params[key])) {
            query.set(key, `[${query.getAll(key).join(',')}]`)
        }
    }

    return query.toString()
}
