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
        country: ['ca', 'us', 'au', 'jp'].join(','),
        types: ['country', 'region', 'locality', 'place'].join(','),
        autocomplete: true,
        access_token: accessToken,
    },
})

export function findPlaces(term = '', options = {}) {
    return Places.get(`${encodeURIComponent(term.trim())}.json`, options)
}

export function fetchMapStyle(styleId) {
    return Style.get(styleId).then(response => response.data)
}
