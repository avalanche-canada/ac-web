import { accessToken, username, api, styleIds } from './config.json'
import fetch from 'utils/fetch'
import { build } from 'utils/url'

export function place(term) {
    if (!term) {
        return Promise.resolve()
    }

    term = encodeURIComponent(term.trim())

    const url = `/geocoding/v5/mapbox.places/${term}.json`

    return fetch(build(url, PLACE_PARAMS, api))
}

export function style(id) {
    const style = styleIds[id]
    const url = `/styles/v1/${username}/${style}`

    return build(url, PARAMS, api)
}

// Constants
const PLACE_PARAMS = {
    country: 'ca,us,au,jp',
    types: 'country,region,locality,place',
    autocomplete: true,
    access_token: accessToken,
}
const PARAMS = {
    access_token: accessToken,
}
