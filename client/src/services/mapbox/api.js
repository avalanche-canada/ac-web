import {accessToken} from './config.json'
import Axios from 'axios'
import queryString from 'query-string'

const baseURL = 'https://api.mapbox.com'

const Style = Axios.create({
    baseURL: `${baseURL}/styles/v1/avalanchecanada`,
    params: {
        access_token: accessToken,
    },
})

const Places = Axios.create({
    baseURL: `${baseURL}/geocoding/v5/mapbox.places`,
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

    return Places.get(`${encodeURIComponent(term.trim())}.json`)
}

export function fetchMapStyle(styleId) {
    return Style.get(styleId)
}
