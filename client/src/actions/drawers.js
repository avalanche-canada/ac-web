import {createAction} from 'redux-actions'
import {isLayerVisible, isMenuOpen} from 'getters/drawers'

export const OPEN_PRIMARY_DRAWER = 'OPEN_PRIMARY_DRAWER'
export const CLOSE_PRIMARY_DRAWER = 'CLOSE_PRIMARY_DRAWER'
export const OPEN_SECONDARY_DRAWER = 'OPEN_SECONDARY_DRAWER'
export const CLOSE_SECONDARY_DRAWER = 'CLOSE_SECONDARY_DRAWER'

export const openPrimaryDrawer = createAction(OPEN_PRIMARY_DRAWER)
export const closePrimaryDrawer = createAction(CLOSE_PRIMARY_DRAWER)
export const openSecondaryDrawer = createAction(OPEN_SECONDARY_DRAWER)
export const closeSecondaryDrawer = createAction(CLOSE_SECONDARY_DRAWER)

export const MENU_OPENED = 'MENU_OPENED'
export const MENU_CLOSED = 'MENU_CLOSED'
export const FILTER_CHANGED = 'FILTER_CHANGED'
export const LAYER_TURNED_ON = 'LAYER_TURNED_ON'
export const LAYER_TURNED_OFF = 'LAYER_TURNED_OFF'

const openMenu = createAction(MENU_OPENED)
export const closeMenu = createAction(MENU_CLOSED)
export function toggleMenu() {
    return (dispatch, getState) => {
        const action = isMenuOpen(getState()) ? closeMenu() : openMenu()

        return dispatch(action)
    }
}

export const changeFilter = createAction(FILTER_CHANGED, changeFilterPayloadCreator)

// Reducing action dispatching to improve performance!
// Less actions means better performance and it is a pattern that needs to be
// considered. Only dispatch an action to turn on/off a layer if it needs to.
export const turnOnLayer = toggleLayerActionCreatorFactory(true)
export const turnOffLayer = toggleLayerActionCreatorFactory(false)

function toggleLayerActionCreatorFactory(visible) {
    const type = visible ? LAYER_TURNED_ON : LAYER_TURNED_OFF
    const actionCreator = createAction(type)

    return layer => (dispatch, getState) => {
        if (isLayerVisible(getState(), layer) === visible) {
            return
        }

        dispatch(actionCreator(layer))
    }
}

function changeFilterPayloadCreator(layer, name, value) {
    return {
        layer,
        name,
        value,
    }
}
