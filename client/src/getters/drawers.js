import {createSelector} from 'reselect'
import * as Layers from 'constants/drawers'

export function isMenuOpen(state) {
    return state.drawers.menu.get('open')
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
