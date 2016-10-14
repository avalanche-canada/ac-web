import {createSelector} from 'reselect'
import {
    MountainInformationNetworkSubmission,
    MountainInformationNetworkObservation
} from 'api/schemas'
import {createElement, POSITIONS} from './utils'
import {point} from 'turf-helpers'
import mapbox from 'services/mapbox/map'
import place from 'components/icons/place.svg'
import {MOUNTAIN_INFORMATION_NETWORK} from 'constants/map/layers'
import {getEntitiesForSchema} from 'reducers/api/getters'

const {LngLat} = mapbox

const key = MountainInformationNetworkSubmission.getKey()
const obsKey = MountainInformationNetworkObservation.getKey()

function createMarkers({latlng, obs = []}) {
    const {length} = obs
    const [lat, lng] = latlng
    const lngLat = LngLat.convert([lng, lat])

    return obs.map(({obtype, obid}, index) => ({
        id: `${obsKey}:${obid}`,
        layer: MOUNTAIN_INFORMATION_NETWORK,
        location: {
            query: {
                panel: `${obsKey}/${obid}`,
            },
        },
        element: createElement({
            src: place,
            title: obtype,
            style: POSITIONS.get(length).get(index),
            width: 40,
            height: 40,
            // className: 'hidden-map-marker',
        }),
        lngLat,
        options: {
            offset: [-20, -20]
        },
    }))
}

function getSubmissions(state) {
    return getEntitiesForSchema(state, MountainInformationNetworkSubmission)
}

function submissionReducer(submissions, submission) {
    return submissions.concat(createMarkers(submission.toJSON()))
}

export default createSelector(
    getSubmissions,
    submissions => submissions.reduce(submissionReducer, [])
)
