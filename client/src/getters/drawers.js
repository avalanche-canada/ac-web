export function getMenu(state) {
    return state.drawers.menu
}

export function getLayers(state) {
    return getMenu(state).layers
}

export function getFilters(state) {
    return getMenu(state).filters
}
