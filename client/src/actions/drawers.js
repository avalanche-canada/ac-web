import {createAction} from 'redux-actions'

function changeFilterPayloadCreator(layer, name, value) {
    return {
        layer,
        name,
        value,
    }
}

export const MENU_OPENED = 'MENU_OPENED'
export const MENU_CLOSED = 'MENU_CLOSED'
export const FILTER_CHANGED = 'FILTER_CHANGED'
export const LAYER_TOGGLED = 'LAYER_TOGGLED'
export const LAYER_TURNED_ON = 'LAYER_TURNED_ON'
export const LAYER_TURNED_OFF = 'LAYER_TURNED_OFF'

export const openMenu = createAction(MENU_OPENED)
export const closeMenu = createAction(MENU_CLOSED)
export const changeFilter = createAction(FILTER_CHANGED, changeFilterPayloadCreator)
export const toggleLayer = createAction(LAYER_TOGGLED)
export const turnOnLayer = createAction(LAYER_TURNED_ON)
export const turnOffLayer = createAction(LAYER_TURNED_OFF)
