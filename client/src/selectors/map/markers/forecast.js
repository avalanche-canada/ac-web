import {createSelector} from 'reselect'
import mapbox from 'services/mapbox/map'
import {FORECASTS} from 'constants/map/layers'
import {ForecastRegion as Schema} from 'api/schemas'
import {getEntitiesForSchema} from 'getters/entities'
import {createElement} from './utils'

function createMarker(region) {
    return {
        id: `${Schema.getKey()}:${region.get('id')}`,
        layer: FORECASTS,
        location: {
            pathname: `/map/forecasts/${region.get('id')}`,
        },
        element: createElement({
            src: region.get('dangerIconUrl'),
            title: region.get('name'),
        }),
        lngLat: mapbox.LngLat.convert(region.get('centroid').toArray()),
        options: {
            offset: [-25, -25]
        },
    }
}

export default createSelector(
    state => getEntitiesForSchema(state, Schema),
    features => features.map(createMarker)
)
