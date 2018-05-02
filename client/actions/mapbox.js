import { createAction } from 'redux-actions'
import { getFeatures } from 'services/mapbox/datasets'
import { hasStatus, getStatus } from 'getters/mapbox'

export const GET_FEATURES = 'GET_FEATURES'

function metaCreator(id) {
    return {
        id,
    }
}

const load = createAction(GET_FEATURES, getFeatures, metaCreator)

export function loadFeatures(type) {
    return (dispatch, getState) => {
        const state = getState()

        if (hasStatus(state, type)) {
            const { isLoading, isLoaded } = getStatus(state, type)

            if (isLoaded || isLoading) {
                return
            }
        }

        dispatch(load(type))
    }
}
