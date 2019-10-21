import { ACCESS_TOKEN, USENAME, API, STYLE_IDS } from './config'
import { Revelstoke } from 'constants/map/locations'
import { path } from 'utils/url'

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
    return path(
        API,
        'styles/v1',
        USENAME,
        styleId,
        'static',
        Array.isArray(overlay) ? overlay.join(',') : overlay,
        [longitude, latitude, zoom, bearing, pitch].join(','),
        auto ? 'auto' : false,
        `${width}x${height}`,
        retina ? '@2x' : false,
        '?access_token=' + ACCESS_TOKEN
    )
}
