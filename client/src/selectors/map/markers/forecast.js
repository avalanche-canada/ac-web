import {createSelector} from 'reselect'
import {point} from 'turf-helpers'
import mapbox from 'services/mapbox/map'
import {FORECASTS} from 'constants/map/layers'
import {ForecastRegion as Schema} from 'api/schemas'
import {getEntitiesForSchema} from 'reducers/api/getters'
import {createElement} from './utils'

const {LngLat} = mapbox
const key = Schema.getKey()

function getFeatures(state) {
    return getEntitiesForSchema(state, Schema)
}

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
        lngLat: LngLat.convert(centroid),
        options: {
            offset: [-25, -25]
        },
    }
}

export default createSelector(
    getFeatures,
    features => features.map(feature => createMarker(feature.toJSON()))
)
