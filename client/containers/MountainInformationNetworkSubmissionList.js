import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'
import { MountainInformationNetworkSubmission as Schema } from 'api/schemas'
import { loadMountainInformationNetworkSubmissionsForDays } from 'actions/entities'
import Universal from 'components/Universal'
import { getResultsSet } from 'getters/api'
import { getEntitiesForSchema } from 'getters/entities'
import Immutable from 'immutable'
import inside from '@turf/inside'
import * as turf from '@turf/helpers'
import { getFeatureCollection } from 'getters/mapbox'
import { FORECAST_REGIONS } from 'services/mapbox/datasets'
import { loadFeatures } from 'actions/mapbox'

function getFilters(state, { types, regions }) {
    const filters = []

    if (types.size > 0) {
        types = new Immutable.Set(types)

        filters.push(
            submission =>
                !submission
                    .get('obs')
                    .map(ob => ob.get('obtype'))
                    .toSet()
                    .intersect(types)
                    .isEmpty()
        )
    }

    if (regions.size > 0) {
        filters.push(
            submission =>
                submission.has('region')
                    ? regions.has(submission.get('region').id)
                    : false
        )
    }

    return filters
}

const runSubmissionsSpatialAnalysis = createSelector(
    state => getEntitiesForSchema(state, Schema),
    state => getFeatureCollection(state, FORECAST_REGIONS),
    (submissions, regions) => {
        if (!regions || submissions.isEmpty()) {
            return submissions
        }

        const { features } = regions

        function setRegion(submission) {
            const point = turf.point(
                submission
                    .get('latlng')
                    .reverse()
                    .toArray()
            )

            for (var i = 0; i < features.length; i++) {
                const region = features[i]

                if (inside(point, region)) {
                    return submission.set('region', region.properties)
                }
            }

            return submission
        }

        return submissions.map(setRegion)
    }
)

const getFilteredSubmissions = createSelector(
    runSubmissionsSpatialAnalysis,
    (state, { days }) => getResultsSet(state, Schema, { days }),
    getFilters,
    (submissions, { ids }, filters) => {
        submissions = new Immutable.List(ids)
            .map(id => submissions.get(id))
            .sortBy(submission => new Date(submission.get('datetime')))
            .reverse()

        return filters.reduce(
            (submissions, filter) => submissions.filter(filter),
            submissions
        )
    }
)

export default connect(
    createStructuredSelector({
        submissions: getFilteredSubmissions,
        status(state, { days }) {
            return getResultsSet(state, Schema, { days })
                .asStatus(MESSAGES)
                .toObject()
        },
    }),
    dispatch => ({
        didMount({ props: { days } }) {
            dispatch(loadMountainInformationNetworkSubmissionsForDays(days))
            dispatch(loadFeatures(FORECAST_REGIONS))
        },
        willReceiveProps({ props, nextProps }) {
            if (props.days !== nextProps.days) {
                dispatch(
                    loadMountainInformationNetworkSubmissionsForDays(
                        nextProps.days
                    )
                )
            }
        },
    })
)(Universal)

const MESSAGES = {
    isLoading: 'Loading submissions...',
    isError: 'An error happened while loading submissions.',
}
