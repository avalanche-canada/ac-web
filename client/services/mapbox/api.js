import { ACCESS_TOKEN, USENAME, API, STYLE_IDS } from './config'
import { Revelstoke } from 'constants/map/locations'

export function createStyleUrl({
    styleId = STYLE_IDS.default,
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
        USENAME,
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

    return API + `/${pathname}?access_token=${ACCESS_TOKEN}`
}
