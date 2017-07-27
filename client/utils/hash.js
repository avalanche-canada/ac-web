import * as qs from 'querystring'

export function parse(search) {
    if (typeof search === 'string') {
        return qs.parse(search.replace(/^\#/, ''))
    }

    return {}
}
