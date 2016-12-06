import {createSelector} from 'reselect'

export function getMenu(state) {
    return state.drawers.menu
}

export function getLayers(state) {
    return state.drawers.menu.get('layers')
}

export const getVisibleLayers = createSelector(
    getLayers,
    layers => layers.filter(layer => layer.get('visible'))
)
