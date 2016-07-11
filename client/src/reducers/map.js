import {handleAction} from 'redux-actions'
import {combineReducers} from 'redux'
import {ZOOM_CHANGED, CENTER_CHANGED, ACTION_CREATED, fitMapToFeature} from 'actions/map'
import {FORECAST_REGIONS_SUCCESS} from 'actions/entities'

function reducer(state, action) {
    return action.payload
}

export default combineReducers({
    center: handleAction(CENTER_CHANGED, reducer, [-125.527, 55.035]),
    zoom: handleAction(ZOOM_CHANGED, reducer, 4),
    action: handleAction(ACTION_CREATED, reducer, null),
})

export function getZoom(state) {
    return state.map.zoom
}
export function getCenter(state) {
    return state.map.center
}
export function getAction(state) {
    return state.map.action
}
