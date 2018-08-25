import {
    accessToken,
    username,
    protocol,
    hostname,
    styleIds,
} from './config.json'
import Url from 'url'
import * as requests from './requests'
import { status } from 'services/fetch/utils'
import { Revelstoke } from 'constants/map/locations'

let signal = null
let controller = null

export async function findPlaces(term) {
    if (signal && !signal.aborted) {
        controller.abort()
    }

    controller = new AbortController()
    signal = controller.signal

    const response = await fetch(requests.place(term, { signal }))

    return await status(response)
}

export async function fetchMapStyle(id) {
    const response = await fetch(requests.style(id))

    return await status(response)
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
