export function getFeatureCollection(state, id) {
    return state.mapbox.features.get(id)
}

export function getStatus(state, id) {
    return state.mapbox.status.get(id)
}

export function hasStatus(state, id) {
    return state.mapbox.status.has(id)
}
