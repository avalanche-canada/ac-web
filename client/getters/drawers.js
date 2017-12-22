import { createSelector, createStructuredSelector } from 'reselect'
import Url from 'url'

export function isMenuOpen(state) {
    return state.drawers.menu.get('open')
}

export function isPrimaryDrawerOpened() {
    const [map, type, id] = document.location.pathname
        .split('/')
        .filter(Boolean)

    return map === 'map' && type && id
}

export function isSecondaryDrawerOpened() {
    const { search, pathname } = document.location
    const panel = Url.parse(search, true).query.panel || ''
    const [type, id] = panel.split('/')

    return pathname.includes('/map') && type && id
}

export function getLayers(state) {
    return state.drawers.menu.get('layers')
}
export function getLayer(state, layer) {
    return state.drawers.menu.getIn(['layers', layer])
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
