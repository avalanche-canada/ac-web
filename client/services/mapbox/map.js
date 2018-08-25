import { accessToken } from './config.json'
import supported from '@mapbox/mapbox-gl-supported'

// TODO: Find a better way!!

if (supported()) {
    import('mapbox-gl/dist/mapbox-gl').then(mapbox => {
        mapbox.accessToken = accessToken
    })
}
