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
export const LAYER_TOGGLED = 'LAYER_TOGGLED'
export const FILTER_CHANGED = 'FILTER_CHANGED'

export const openMenu = createAction(MENU_OPENED)
export const closeMenu = createAction(MENU_CLOSED)
export const toggleLayer = createAction(LAYER_TOGGLED)
export const changeFilter = createAction(FILTER_CHANGED, changeFilterPayloadCreator)
