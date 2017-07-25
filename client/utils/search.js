import * as qs from 'querystring'
import { clean } from '~/utils/object'

export function parse(search) {
    if (typeof search === 'string') {
        return qs.parse(search.replace(/^\?/, ''))
    }

    return {}
}

export function stringify(query) {
    if (Object.keys(query).length > 0) {
        return '?' + qs.stringify(query)
    }

    return null
}

export function assign(previous, next) {
    previous = typeof previous === 'string' ? parse(previous) : previous
    next = typeof next === 'string' ? parse(next) : next

    return clean(Object.assign({}, previous, next))
}
