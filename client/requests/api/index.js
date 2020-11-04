import config from './config.json'
import { DateParam } from 'hooks/params'
import fetch from 'utils/fetch'
import * as utils from 'utils/url'

export function product(language, id) {
    return get(language, 'products', id)
}

export function products(language, date) {
    return get(language, 'products', undefined, date)
}

export function area(language, id) {
    return get(language, 'areas', id)
}

export function areas(language, date) {
    return get(language, 'areas', undefined, date)
}

export function metadata(language) {
    return get(language, 'metadata')
}

// Utils
function get(language, type, id, date) {
    date = DateParam.format(date)

    const url = utils.path(config.url, 'forecasts', language, type, id, date)
    const options = {
        headers: new Headers({
            'x-api-key': config.key,
        }),
    }

    return fetch(url, options)
}
