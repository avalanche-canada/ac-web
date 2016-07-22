import {handleActions} from 'redux-actions'
import {combineReducers} from 'redux'
import {MENU_OPENED, MENU_CLOSED, LAYER_TOGGLED,FILTER_CHANGED} from 'actions/drawers'

function setOpen(state, open) {
    return {
        ...state,
        open
    }
}
function toggleLayer({layers, ...rest}, name) {
    if (layers.has(name)) {
        layers.remove(name)
    } else {
        layers.add(name)
    }

    return {
        ...rest,
        layers: new Set([...layers]),
    }
}
function setFilter({filters, ...rest}, {name, params}) {
    filters.set(name, params)

    return {
        ...rest,
        filters: new Map([...filters])
    }
}
const MENU = {
    open: !false,
    layers: new Set(),
    filters: new Map(),
}

export default combineReducers({
    menu: handleActions({
        [MENU_OPENED]: state => setOpen(state, true),
        [MENU_CLOSED]: state => setOpen(state, false),
        [LAYER_TOGGLED]: (state, {payload}) => toggleLayer(state, payload),
        [FILTER_CHANGED]: (state, {payload}) => setFilter(state, payload),
    }, MENU),
})

export function getMenu(state) {
    return state.drawers.menu
}

export function getLayers(state) {
    return getMenu(state).layers
}

export function getFilters(state) {
    return getMenu(state).filters
}
