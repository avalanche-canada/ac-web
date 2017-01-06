import {accessToken, username, api} from './config.json'
import Axios from 'axios'

const Style = Axios.create({
    baseURL: `${api}/styles/v1/${username}`,
    params: {
        access_token: accessToken,
    },
})

const Places = Axios.create({
    baseURL: `${api}/geocoding/v5/mapbox.places`,
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
