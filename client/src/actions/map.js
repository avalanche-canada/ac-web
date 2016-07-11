import {createAction} from 'redux-actions'
import bbox from 'turf-bbox'
import {getEntityForSchema} from 'reducers/entities'
import {loadForecastRegions} from 'actions/entities'
import {ForecastRegion} from 'api/schemas'

export const ZOOM_CHANGED = 'ZOOM_CHANGED'
export const CENTER_CHANGED = 'CENTER_CHANGED'
export const ACTION_CREATED = 'ACTION_CREATED'

function createFitMapToFeaturePayload(feature, options) {
    return {
        type: 'fitBounds',
        payload: [bbox(feature.toJSON()), options]
    }
}

export const zoomChanged = createAction(ZOOM_CHANGED)
export const centerChanged = createAction(CENTER_CHANGED)
export const fitMapToFeature = createAction(ACTION_CREATED, createFitMapToFeaturePayload)

export function forecastRegionRouteEntered(nextState) {
    return (dispatch, getState) => {
        const {name} = nextState.params
        const state = getState()
        const region = getEntityForSchema(state, ForecastRegion, name)

        if (region) {
            dispatch(fitMapToFeature(region, {
                offset: [125, 0],
                padding: 25,
            }))
        } else {
            dispatch(loadForecastRegions())
            .then(() => {
                dispatch(forecastRegionRouteEntered(nextState))
            })
        }
    }
}
