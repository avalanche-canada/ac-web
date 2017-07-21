import { createAction } from 'redux-actions'
import { createBinaryAction, createOptimisticAction } from '~/utils/redux'
import { isLayerVisible, isMenuOpen } from '~/getters/drawers'

export const MENU_OPENED = 'MENU_OPENED'
export const MENU_CLOSED = 'MENU_CLOSED'
export const FILTER_CHANGED = 'FILTER_CHANGED'
export const LAYER_TURNED_ON = 'LAYER_TURNED_ON'
export const LAYER_TURNED_OFF = 'LAYER_TURNED_OFF'

const openMenu = createAction(MENU_OPENED)
export const closeMenu = createAction(MENU_CLOSED)
export const toggleMenu = createBinaryAction(isMenuOpen, closeMenu, openMenu)
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
