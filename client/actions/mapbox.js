import { createAction } from 'redux-actions'
import { getFeatures } from '~/services/mapbox/datasets'

// TODO: Use import {getStatus, hasStatus} from '~/getters/mapbox'
// to perhaps not load to reduce loadFeatures

export const GET_FEATURES = 'GET_FEATURES'

function metaCreator(id) {
    return {
        id,
    }
}

export const loadFeatures = createAction(GET_FEATURES, getFeatures, metaCreator)
