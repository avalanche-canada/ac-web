import { accessToken } from './config.json'
import supported from '@mapbox/mapbox-gl-supported'

if (supported()) {
    import('mapbox-gl/mapbox-gl').then(mapbox => {
        mapbox.accessToken = accessToken
    })
}
