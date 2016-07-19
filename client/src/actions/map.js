import {createAction} from 'redux-actions'
import bbox from 'turf-bbox'

export const ZOOM_CHANGED = 'ZOOM_CHANGED'
export const CENTER_CHANGED = 'CENTER_CHANGED'
export const ACTION_CREATED = 'ACTION_CREATED'

export const zoomChanged = createAction(ZOOM_CHANGED)
export const centerChanged = createAction(CENTER_CHANGED)

function createFitMapToFeaturePayload(feature) {
    const options = {
        offset: [-125, 0],
        padding: 25,
    }

    return {
        type: 'fitBounds',
        payload: [bbox(feature.toJSON()), options]
    }
}

export const fitMapToFeature = createAction(ACTION_CREATED, createFitMapToFeaturePayload)
