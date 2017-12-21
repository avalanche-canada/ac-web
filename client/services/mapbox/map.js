import { accessToken } from './config.json'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

export default Object.assign(mapboxgl, { accessToken })

// TODO: removed when https://github.com/mapbox/mapbox-gl-js/issues/1776 gets fixed
const { fitBounds } = mapboxgl.Map.prototype
mapboxgl.Map.prototype.fitBounds = function(bounds, options, eventData) {
    if (typeof options === 'object') {
        const canvas = this.getCanvas()
        const width = canvas.clientWidth
        const [x = 0] = options.offset || []
        const { padding = 0 } = options

        if (width < 2 * padding + 2 * Math.abs(x)) {
            options = undefined
        }
    }

    return fitBounds.call(this, bounds, options, eventData)
}

export { styles } from './config.json'
