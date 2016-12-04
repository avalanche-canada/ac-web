import Immutable from 'immutable'
import {handleAction, handleActions} from 'redux-actions'
import {combineReducers} from 'redux'
import {getPayload} from 'reducers/utils'
import * as MapActions from 'actions/map'
import * as DrawersActions from 'actions/drawers'
import {getLayerIds} from 'constants/map/layers'

function setCenter(style, {payload}) {
    return style.set('center', payload)
}
function setZoom(style, {payload}) {
    return style.set('zoom', payload)
}
function transform(state, {payload}) {
    return Immutable.fromJS(payload)
}
function toggleLayersFactory(visible) {
    visible = visible ? 'visible' : 'none'

    return (style, {payload}) => style.withMutations(style => {
        const layers = style.get('layers')

        getLayerIds(payload).forEach(id => {
            const index = layers.findIndex(layer => layer.get('id') === id)

            style.setIn(['layers', index, 'layout', 'visibility'], visible)
        })
    })
}

export default combineReducers({
    command: handleAction(MapActions.MAP_COMMAND_CREATED, getPayload, null),
    style: handleActions({
        [MapActions.LOAD_MAP_STYLE_SUCCESS]: transform,
        [MapActions.LOAD_MAP_STYLE_FAILURE]: getPayload,
        [MapActions.CENTER_CHANGED]: setCenter,
        [MapActions.ZOOM_CHANGED]: setZoom,
        [DrawersActions.LAYER_TURNED_ON]: toggleLayersFactory(true),
        [DrawersActions.LAYER_TURNED_OFF]: toggleLayersFactory(false),
    }, null),
})
