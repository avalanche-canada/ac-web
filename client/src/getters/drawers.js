import {createSelector} from 'reselect'

export function isMenuOpen(state) {
    return state.drawers.menu.get('open')
}

export function getLayers(state) {
    return state.drawers.menu.get('layers')
}

export const getVisibleLayers = createSelector(
    getLayers,
    layers => layers.filter(layer => layer.get('visible'))
)

export function isLayerVisible(state, layer) {
    return getLayers(state).getIn([layer, 'visible'])
}
