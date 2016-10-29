import turf from 'turf-helpers'
import {createSelector} from 'reselect'
import {WeatherStation as Schema} from 'api/schemas'
import {createSource} from './utils'
import {getEntitiesForSchema} from 'reducers/api/getters'

const {assign} = Object
const key = Schema.getKey()

function transform({latitude, longitude, ...properties}) {
    return turf.point([longitude, latitude], properties)
}

function getFeatures(state) {
    return getEntitiesForSchema(state, Schema)
}

const getTransformedFeatures = createSelector(
    getFeatures,
    features => features.map(
        feature => transform(feature.toJSON())
    ).toArray()
)

export default createSelector(
    getTransformedFeatures,
    features => createSource({
        id: key,
        features,
    })
)
