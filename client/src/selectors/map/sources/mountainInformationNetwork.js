import {createSelector} from 'reselect'
import {MountainInformationNetworkSubmission as Schema} from 'api/schemas'
import {getResultsSetForSchema} from 'reducers/api/getters'
import {getEntitiesForSchema} from 'getters/entities'
import {RESULT} from 'reducers/api/results'
import {createSource} from './utils'
import {point} from 'turf-helpers'
import {getLayers} from 'getters/drawers'
import {MOUNTAIN_INFORMATION_NETWORK} from 'constants/map/layers'
import {paramsToKey} from 'api/utils'

const TYPES = ['quick', 'avalanche', 'snowpack', 'weather', 'incident']

function createSubmissionFeature(submission) {
    const [lat, lng] = submission.get('latlng').toArray()
    const types = submission.get('obs').map(ob => ob.get('obtype')).toArray()

    return point([lng, lat], {
        id: submission.get('subid'),
        types,
        icon: types.includes('incident') ? 'min-pin-with-incident' : 'min-pin',
        title: submission.get('title'),
    })
}

const getTransformedSubmissions = createSelector(
    state => getEntitiesForSchema(state, Schema),
    submissions => submissions.map(createSubmissionFeature)
)

const getDaysFilterValue = createSelector(
    getLayers,
    layers => layers.getIn([MOUNTAIN_INFORMATION_NETWORK, 'filters', 'days', 'value'])
)

const getTypeFilterValue = createSelector(
    getLayers,
    layers => layers.getIn([MOUNTAIN_INFORMATION_NETWORK, 'filters', 'type', 'value'])
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
            submissions = submissions.filter(submission => submission.properties.types.includes(type))
        }
        return submissions
    }
)

export default createSelector(
    getFilteredSubmissions,
    features => createSource({
        id: Schema.getKey(),
        features,
        cluster: true,
        clusterMaxZoom: 14,
    })
)
