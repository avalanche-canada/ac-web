import { accessToken, username, api } from './config.json'

export function place(term, options) {
    term = encodeURIComponent(term.trim())

    const url = `${api}/geocoding/v5/mapbox.places/${term}.json?${params.toString()}`

    return new Request(url, options)
}

export function style(id) {
    const url = `${api}/styles/v1/${username}/${id}?access_token=${accessToken}`

    return new Request(url)
}

const params = new URLSearchParams({
    country: 'ca,us,au,jp',
    types: 'country,region,locality,place',
    autocomplete: true,
    access_token: accessToken,
})
