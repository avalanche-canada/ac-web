import {handleAction} from 'redux-actions'
import {combineReducers} from 'redux'
import {ZOOM_CHANGED, CENTER_CHANGED} from 'actions/map'

function reducer(state, action) {
    return action.payload
}

export default combineReducers({
    center: handleAction(CENTER_CHANGED, reducer, [-125.527, 55.035]),
    zoom: handleAction(ZOOM_CHANGED, reducer, 4),
})

export function getZoom(state) {
    return state.map.zoom
}
export function getCenter(state) {
    return state.map.center
}
