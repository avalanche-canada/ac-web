import {createSelector} from 'reselect'
import {MountainInformationNetworkSubmission as Schema} from 'api/schemas'
import {getEntitiesForSchema, getResultsSetForSchema} from 'reducers/api/getters'
import {RESULT} from 'reducers/api/results'
import {createSource} from './utils'
import {point} from 'turf-helpers'
import {getFilters} from 'reducers/drawers'
import {MOUNTAIN_INFORMATION_NETWORK} from 'constants/map/layers'
import {paramsToKey} from 'api/utils'

const {assign} = Object
const key = Schema.getKey()

function createSubmissionFeature(submission) {
    const {latlng, title, subid, obs} = submission.toObject()
    const [lat, lng] = latlng

    return point([lng, lat], {
        id: subid,
        types: new Set(obs.map(ob => ob.get('obtype')).toArray()),
        title,
    })
}

const getTransformedSubmissions = createSelector(
    state => getEntitiesForSchema(state, Schema),
    submissions => submissions.map(createSubmissionFeature)
)

const getDaysFilterValue = createSelector(
    getFilters,
    filters => filters.get(MOUNTAIN_INFORMATION_NETWORK).get('days').value
)

const getTypeFilterValue = createSelector(
    getFilters,
    filters => filters.get(MOUNTAIN_INFORMATION_NETWORK).get('type').value
)

const getSubmissionIds = createSelector(
    state => getResultsSetForSchema(state, Schema),
    getDaysFilterValue,
    (results, days) => results.get(paramsToKey({days}), RESULT).ids
)

const getFilteredSubmissions = createSelector(
    getTransformedSubmissions,
    getSubmissionIds,
    getTypeFilterValue,
    (submissions, ids, type) => {
        submissions = Array.from(ids).map(id => submissions.get(id))

        // TODO: Should be using filter on the layer instead...probably faster!!!
        // At least for the the type

        if (type !== 'all') {
            submissions = submissions.filter(submission => submission.properties.types.has(type))
        }
        return submissions
    }
)

export default createSelector(
    getFilteredSubmissions,
    features => createSource({
        id: key,
        cluster: true,
        features,
    })
)
