import { createAction } from 'redux-actions'
import { createOptimisticAction } from 'utils/redux'
import { isLayerVisible } from 'getters/drawers'

export const FILTER_CHANGED = 'FILTER_CHANGED'
export const LAYER_TURNED_ON = 'LAYER_TURNED_ON'
export const LAYER_TURNED_OFF = 'LAYER_TURNED_OFF'

export const changeFilter = createAction(
    FILTER_CHANGED,
    changeFilterPayloadCreator
)

export const turnOnLayer = createOptimisticAction(
    (state, layer) => isLayerVisible(state, layer) === false,
    createAction(LAYER_TURNED_ON)
)
export const turnOffLayer = createOptimisticAction(
    (state, layer) => isLayerVisible(state, layer) === true,
    createAction(LAYER_TURNED_OFF)
)

function changeFilterPayloadCreator(layer, name, value) {
    return {
        layer,
        name,
        value,
    }
}
