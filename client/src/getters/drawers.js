import {createSelector} from 'reselect'

export function isMenuOpen(state) {
    return state.drawers.menu.get('open')
}

export function getPrimaryDrawer(state) {
    return state.drawers.primary
}

export function isPrimaryDrawerOpened(state) {
    return getPrimaryDrawer(state).get('open')
}

export function getSecondaryDrawer(state) {
    return state.drawers.secondary
}

export function isSecondaryDrawerOpened(state) {
    return getSecondaryDrawer(state).get('open')
}

export function getLayers(state) {
    return state.drawers.menu.get('layers')
}
export function getLayer(state, layer) {
    return state.drawers.menu.getIn(['layers', layer])
}

export const getVisibleLayers = createSelector(
    getLayers,
    layers => layers.filter(layer => layer.visible)
)

export function isLayerVisible(state, layer) {
    return state.drawers.menu.getIn(['layers', layer, 'visible'])
}

export function getLayerFilter(state, layer, type) {
    return state.drawers.menu.getIn(['layers', layer, 'filters', type, 'value'])
}
