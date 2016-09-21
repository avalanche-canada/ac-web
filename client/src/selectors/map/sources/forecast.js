import {createSelector} from 'reselect'
import {ForecastRegion as Schema} from 'api/schemas'
import {createSource, createCentroid} from './utils'
import {getEntitiesForSchema} from 'reducers/api/getters'

const {assign} = Object
const key = Schema.getKey()

function getFeatures(state) {
    return getEntitiesForSchema(state, Schema)
}

function addTitle(feature) {
    feature.properties.title = feature.properties.name

    return feature
}

const getTransformedFeatures = createSelector(
    getFeatures,
    features => features.toList().toJSON().map(addTitle)
)

export default createSelector(
    getTransformedFeatures,
    features => createSource({
        id: key,
        features,
    })
)

export const getCentroids = createSelector(
    getTransformedFeatures,
    features => createSource({
        id: `${key}-centroids`,
        features: features.map(createCentroid)
    })
)
