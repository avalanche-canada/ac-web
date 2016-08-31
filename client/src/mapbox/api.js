import {accessToken} from './config.json'
import Axios from 'axios'
import queryString from 'query-string'

const places = Axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        country: 'ca',
        types: ['locality', 'place', 'poi'].join(','),
        autocomplete: false,
        access_token: accessToken,
    },
})

export function findPlaces(term = '') {
    // TODO: Should cancel existing request
    // https://github.com/mzabriskie/axios/issues/333
    const endpoint = `${encodeURIComponent(term.trim())}.json`

    return places.get(endpoint)
}
