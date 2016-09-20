import {createSelector} from 'reselect'
import {MountainInformationNetworkSubmission as Schema} from 'api/schemas'
import {getEntitiesForSchema} from 'reducers/api/getters'
import {createSource} from './utils'
import {point} from 'turf-helpers'

const {assign} = Object
const key = Schema.getKey()

function getSubmissions(state) {
    return getEntitiesForSchema(state, Schema)
}

const getTransformedSubmissions = createSelector(
    getSubmissions,
    submissions => (
        submissions.toList().toJSON().map(submission => {
            const {latlng, ...properties} = submission
            const [lat, lng] = latlng

            // TODO: Ask Will to add the headline property
            // assign(properties, {
            //     title: properties.headline
            // })

            return point([lng, lat], properties)
        })
    )
)

export default createSelector(
    getTransformedSubmissions,
    features => createSource({
        id: key,
        cluster: true,
        clusterMaxZoom: 8,
        features,
    })
)
