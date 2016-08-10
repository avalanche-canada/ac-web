import {handleAction, handleActions} from 'redux-actions'
import {combineReducers} from 'redux'
import {getPayload} from 'reducers/utils'
import {
    ZOOM_CHANGED,
    CENTER_CHANGED,
    CLUSTER_ACTIVATED,
    CLUSTER_DEACTIVATED,
} from 'actions/map'

export default combineReducers({
    center: handleAction(CENTER_CHANGED, getPayload, [-125.527, 55.035]),
    zoom: handleAction(ZOOM_CHANGED, getPayload, 4),
    cluster: handleActions({
        CLUSTER_ACTIVATED: getPayload,
        CLUSTER_DEACTIVATED: () => null,
    }, null),
})

export function getZoom(state) {
    return state.map.zoom
}
export function getCenter(state) {
    return state.map.center
}
export function getCluster(state) {
    return state.map.cluster
}
