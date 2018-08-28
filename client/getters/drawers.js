import { createSelector } from 'reselect'

export function getLayers(state) {
    return state.drawers.menu.get('layers')
}

export const getVisibleLayers = createSelector(getLayers, layers =>
    layers.filter(layer => layer.visible)
)

export function isLayerVisible(state, layer) {
    return state.drawers.menu.getIn(['layers', layer, 'visible'])
}

export function getLayerFilter(state, layer, type) {
    return state.drawers.menu.getIn(['layers', layer, 'filters', type, 'value'])
}
