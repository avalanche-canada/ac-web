import config from './config.json'
import { DateParam } from 'hooks/params'
import fetch from 'utils/fetch'
import * as utils from 'utils/url'

export function product(language, id) {
    return get(language, 'products', id)
}

export function products(language) {
    return get(language, 'products')
}

export function area(language, id) {
    return get(language, 'areas', id)
}

export function areas(language) {
    return get(language, 'areas')
}

export function metadata(language) {
    return get(language, 'metadata')
}

export function archive(language, date) {
    return get(language, 'archive', undefined, date.toISOString())
}

// Utils
function get(language, type, id, date) {
    const url = utils.path(config.url, 'forecasts', language, type, id, date)
    const options = {
        headers: new Headers({
            'x-api-key': config.key,
        }),
    }

    return fetch(url, options)
}
