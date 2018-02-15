import {
    accessToken,
    username,
    api,
    protocol,
    hostname,
    styleIds,
} from './config.json'
import Axios from 'axios'
import Url from 'url'
import { Revelstoke } from 'constants/map/locations'

const style = Axios.create({
    baseURL: `${api}/styles/v1/${username}`,
    params: {
        access_token: accessToken,
    },
})

const places = Axios.create({
    baseURL: `${api}/geocoding/v5/mapbox.places`,
    params: {
        country: 'ca,us,au,jp',
        types: 'country,region,locality,place',
        autocomplete: true,
        access_token: accessToken,
    },
})

export function findPlaces(term = '', options = {}) {
    return places.get(`${encodeURIComponent(term.trim())}.json`, options)
}

export function fetchMapStyle(styleId) {
    return style.get(styleId).then(response => response.data)
}

export function createStyleUrl({
    styleId = styleIds['2016'],
    overlay,
    longitude = Revelstoke.longitude,
    latitude = Revelstoke.latitude,
    zoom = 10,
    bearing = 0,
    pitch = 0,
    auto = false,
    width = 250,
    height = 250,
    retina = false,
} = {}) {
    let pathname = [
        'styles/v1',
        username,
        styleId,
        'static',
        Array.isArray(overlay) ? overlay.join(',') : false,
        `${longitude},${latitude},${zoom},${bearing},${pitch}`,
        auto ? 'auto' : false,
        `${width}x${height}`,
    ]
        .filter(Boolean)
        .join('/')

    if (retina) {
        pathname = pathname + '@2x'
    }

    return Url.format({
        protocol,
        hostname,
        pathname,
        query: {
            access_token: accessToken,
        },
    })
}
