import { ACCESS_TOKEN, API } from './config'
import fetch from 'utils/fetch'
import { build } from 'utils/url'

export function place(term) {
    if (!term) {
        return Promise.resolve()
    }

    term = encodeURIComponent(term.trim())

    const url = `/geocoding/v5/mapbox.places/${term}.json`

    return fetch(build(url, PLACE_PARAMS, API))
}

// Constants
const PLACE_PARAMS = {
    country: 'ca,us,au,jp',
    types: 'country,region,locality,place',
    autocomplete: true,
    access_token: ACCESS_TOKEN,
}
