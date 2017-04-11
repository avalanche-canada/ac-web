import {createAction} from 'redux-actions'
import {getFeatureCollection, getStatus, hasStatus} from '/getters/mapbox'
import {getFeatures} from '/services/mapbox/datasets'

export const GET_FEATURES = 'GET_FEATURES'

const request = createAction(GET_FEATURES, getFeatures, id => ({id}))

export function loadFeatures(id) {
    return (dispatch, getState) => {
        if (shouldDispatchGetFeatures(getState(), id)) {
            return dispatch(request(id))
        }
    }
}

function shouldDispatchGetFeatures(state, id) {
    return true
    if (!hasStatus(state, id)) {
        return true
    }

    const {isLoaded, isLoading} = getStatus(state, id)

    return !isLoading || !isLoaded
}
