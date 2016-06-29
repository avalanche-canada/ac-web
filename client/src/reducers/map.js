import {combineReducers} from 'redux'
import {ZOOM_CHANGED, CENTER_CHANGED} from 'actions/map'

function center(state = [-118.1957, 50.9981], {type, payload}) {
    if (type === CENTER_CHANGED) {
        return payload
    }

    return state
}

function zoom(state = 10, {type, payload}) {
    if (type === ZOOM_CHANGED) {
        return payload
    }

    return state
}

export default combineReducers({
    center,
    zoom,
})

export function getZoom(state) {
    return state.map.zoom
}
export function getCenter(state) {
    return state.map.center
}
