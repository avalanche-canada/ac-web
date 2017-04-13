import {createAction} from 'redux-actions'
import {
    createBinaryAction,
    createOptimisticAction
} from 'utils/redux'
import {
    isLayerVisible,
    isMenuOpen,
    isPrimaryDrawerOpened,
    isSecondaryDrawerOpened
} from 'getters/drawers'

export const OPEN_PRIMARY_DRAWER = 'OPEN_PRIMARY_DRAWER'
export const CLOSE_PRIMARY_DRAWER = 'CLOSE_PRIMARY_DRAWER'
export const OPEN_SECONDARY_DRAWER = 'OPEN_SECONDARY_DRAWER'
export const CLOSE_SECONDARY_DRAWER = 'CLOSE_SECONDARY_DRAWER'

export const openPrimaryDrawer = createOptimisticAction(
    isPrimaryDrawerOpened,
    false,
    createAction(OPEN_PRIMARY_DRAWER)
)
export const closePrimaryDrawer = createOptimisticAction(
    isPrimaryDrawerOpened,
    true,
    createAction(CLOSE_PRIMARY_DRAWER)
)
export const openSecondaryDrawer = createOptimisticAction(
    isSecondaryDrawerOpened,
    false,
    createAction(OPEN_SECONDARY_DRAWER)
)
export const closeSecondaryDrawer = createOptimisticAction(
    isSecondaryDrawerOpened,
    true,
    createAction(CLOSE_SECONDARY_DRAWER)
)

export const MENU_OPENED = 'MENU_OPENED'
export const MENU_CLOSED = 'MENU_CLOSED'
export const FILTER_CHANGED = 'FILTER_CHANGED'
export const LAYER_TURNED_ON = 'LAYER_TURNED_ON'
export const LAYER_TURNED_OFF = 'LAYER_TURNED_OFF'

const openMenu = createAction(MENU_OPENED)
export const closeMenu = createAction(MENU_CLOSED)
export const toggleMenu = createBinaryAction(isMenuOpen, closeMenu, openMenu)
export const changeFilter = createAction(FILTER_CHANGED, changeFilterPayloadCreator)

export const turnOnLayer = createOptimisticAction(
    isLayerVisible,
    false,
    createAction(LAYER_TURNED_ON)
)
export const turnOffLayer = createOptimisticAction(
    isLayerVisible,
    true,
    createAction(LAYER_TURNED_OFF)
)

function changeFilterPayloadCreator(layer, name, value) {
    return {
        layer,
        name,
        value,
    }
}
