import {ForecastRegion} from 'api/schemas'
import {createElement} from './utils'
import {point} from 'turf-helpers'
import mapbox from 'mapbox/map'
import {FORECASTS} from 'constants/map/layers'

const {keys} = Object
const {LngLat} = mapbox
const key = ForecastRegion.getKey()

function createMarker({id, properties}) {
    const {dangerIconUrl, centroid, name} = properties

    return {
        id: `${key}:${id}`,
        layer: FORECASTS,
        location: {
            pathname: `/map/forecasts/${id}`,
        },
        element: createElement({
            src: dangerIconUrl,
            title: name,
        }),
        lnglat: LngLat.convert(centroid),
        options: {
            offset: [-25, -25]
        },
    }
}

export default []

export function addToList(state, {payload}) {
    const regions = payload.entities[key]
    const features = keys(regions).map(key => createMarker(regions[key]))

    return state.concat(features)
}
