import Immutable from 'immutable'
import {handleAction, handleActions} from 'redux-actions'
import {combineReducers} from 'redux'
import {getPayload} from '/reducers/utils'
import * as Actions from 'actions/map'
import Layers from '/constants/map/layers'
import Sources from '/constants/map/sources'
import Status from '/utils/status'
import typeToReducer from 'type-to-reducer'

export default combineReducers({
    command: handleAction(Actions.MAP_COMMAND_CREATED, getPayload, null),
    status: typeToReducer({
        [Actions.LOAD_MAP_STYLE]: {
            PENDING: status => status.start(),
            REJECTED: status => status.reject(),
            FULFILLED: status => status.fulfill(),
        }
    }, new Status()),
    style: handleAction(
        `${Actions.LOAD_MAP_STYLE}_FULFILLED`,
        mergeStyle,
        Immutable.fromJS({
            sources: Sources,
            layers: Layers,
        })
    ),
    activeFeatures: handleAction(
        Actions.ACTIVE_FEATURES_CHANGED,
        setActiveFeatures,
        new Immutable.Map()
    ),
    width: handleAction(
        Actions.MAP_WIDTH_CHANGED,
        getPayload,
        window.innerWidth
    ),
})

// Style
function mergeStyle(style, {payload}) {
    // mergeDeep does not deal well with arrays, we are helping it here!
    // it merges using index and will overides existing layers
    payload.layers = payload.layers.concat(style.get('layers').toJSON())

    return style.delete('layers').mergeDeep(payload)
}

// Active features
function setActiveFeatures(features, {payload}) {
    payload = new Immutable.Map(Array.from(payload))

    if (features.equals(payload)) {
        return features
    } else {
        return payload
    }
}
