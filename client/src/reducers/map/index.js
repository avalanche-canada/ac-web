import {handleAction} from 'redux-actions'
import {combineReducers} from 'redux'
import {getPayload} from 'reducers/utils'
import * as Actions from 'actions/map'
import layers from './layers'
import sources from './sources'
import markers from './markers'

export default combineReducers({
    center: handleAction(Actions.CENTER_CHANGED, getPayload, [-125.527, 55.035]),
    zoom: handleAction(Actions.ZOOM_CHANGED, getPayload, 4),
    layers,
    sources,
    markers,
})
