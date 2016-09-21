import {handleAction} from 'redux-actions'
import {combineReducers} from 'redux'
import {getPayload} from 'reducers/utils'
import * as Actions from 'actions/map'

// Default zoom and center fits as best as possible western Canada.
// It includes Yukon.

export default combineReducers({
    center: handleAction(Actions.CENTER_CHANGED, getPayload, [-125.15, 54.80]),
    zoom: handleAction(Actions.ZOOM_CHANGED, getPayload, 4.3),
})
