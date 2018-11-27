import { get } from 'services/fetch/requests'
import { accessToken, username, api, styleIds } from './config.json'

export function place(term, options) {
    term = encodeURIComponent(term.trim())

    const url = `${api}/geocoding/v5/mapbox.places/${term}.json`

    return get(url, PLACE_PARAMS, options)
}

export function style(id) {
    const style = styleIds[id]
    const url = `${api}/styles/v1/${username}/${style}`

    return get(url, PARAMS)
}

export function features(dataset) {
    const url = `${api}/datasets/v1/${username}/${dataset}/features`

    return get(url, PARAMS)
}

const PLACE_PARAMS = new URLSearchParams({
    country: 'ca,us,au,jp',
    types: 'country,region,locality,place',
    autocomplete: true,
    access_token: accessToken,
})

const PARAMS = new URLSearchParams({
    access_token: accessToken,
})
