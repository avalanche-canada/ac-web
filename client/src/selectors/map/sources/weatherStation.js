import {createSelector} from 'reselect'
import turf from 'turf-helpers'
import {WeatherStation} from 'api/schemas'
import {createSource} from './utils'
import {getEntitiesForSchema} from 'getters/entities'

function transform(station) {
    return turf.point([station.get('longitude'), station.get('latitude')], {
        stationId: station.get('stationId'),
        title: station.get('name'),
    })
}

const getTransformedFeatures = createSelector(
    state => getEntitiesForSchema(state, WeatherStation),
    features => features.map(transform).toList()
)

export default createSelector(
    getTransformedFeatures,
    features => createSource({
        id: WeatherStation.getKey(),
        features,
        cluster: true,
    })
)
