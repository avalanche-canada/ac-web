import {handleActions} from 'redux-actions'
import {List} from 'immutable'
import * as MapActions from 'actions/map'
import * as EntitiesActions from 'actions/entities'
import * as LayersActions from 'actions/drawers'
import ForecastMarkers, {addToList as addForecastMarkers} from './forecast'
import MountainInformationNetworkMarkers, {addToList as addMountainInformationNetworkMarkers} from './mountainInformationNetwork'
import './markers.css'

// TODO: React to layer toogle

const EMPTY = new List()
let MARKERS = new List([
    ...ForecastMarkers,
    ...MountainInformationNetworkMarkers,
])

function handleMapStateChanged(state, {payload}) {
    return payload ? MARKERS : EMPTY
}

function createEntitiesHandler(addToList) {
    return (state, action) => {
        if (state === EMPTY) {
            MARKERS = addToList(MARKERS, action)

            return state
        } else {
            return addToList(state, action)
        }
    }
}

function toggleVisibility(marker, visible) {
    marker.element.classList.toggle('hidden-map-marker', visible)
}

function toggleVisibilityForLayer(state, name) {
    state.forEach(marker => {
        if (marker.layer === name) {
            toggleVisibility(marker)
        }
    })
}

function handleLayerToggled(state, {payload}) {
    toggleVisibilityForLayer(state === EMPTY ? MARKERS : state, payload)

    return state
}

function handleFeaturesClicked(state, {payload}) {
    const clusters = payload.filter(feature => feature.properties.cluster)

    clusters.forEach(cluster => {

    })

    return state
}

function handleNoFeaturesClicked(state) {
    return state
}

export default handleActions({
    [MapActions.LOAD_STATE_CHANGED]: handleMapStateChanged,
    [MapActions.FEATURES_CLICKED]: handleFeaturesClicked,
    [MapActions.NO_FEATURES_CLICKED]: handleNoFeaturesClicked,
    [EntitiesActions.FORECAST_REGIONS_SUCCESS]: createEntitiesHandler(addForecastMarkers),
    [EntitiesActions.MOUNTAIN_INFORMATION_NETWORK_SUBMISSIONS_SUCCESS]: createEntitiesHandler(addMountainInformationNetworkMarkers),
    [LayersActions.LAYER_TOGGLED]: handleLayerToggled,
}, EMPTY)
