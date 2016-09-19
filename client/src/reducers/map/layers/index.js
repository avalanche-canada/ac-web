import {handleActions} from 'redux-actions'
import {List} from 'immutable'
import * as MapActions from 'actions/map'
import * as LayersActions from 'actions/drawers'
import * as Layers from 'constants/map/layers'
import ForecastLayers from './forecast'
import HotZoneReportLayers from './hotZoneReport'
import MountainInformationNetworkLayers from './mountainInformationNetwork'

// TODO: Integrate this initial visible state
// TODO: Layers has to send initialization action!!!
import {getLayers as getVisibleLayers} from 'reducers/drawers'

// TODO: Handle filter changed

const EMPTY = new List()
let LAYERS = new List([
    ...ForecastLayers,
    ...HotZoneReportLayers,
    ...MountainInformationNetworkLayers,
])

export default handleActions({
    [MapActions.LOAD_STATE_CHANGED]: handleMapStateChanged,
    [LayersActions.LAYER_TOGGLED]: handleLayerToggled,
}, EMPTY)


function handleMapStateChanged(state, {payload}) {
    return payload ? LAYERS : EMPTY
}

function handleLayerToggled(state, {payload}) {
    if (state === EMPTY) {
        // Update visibility even when map is not done loading,
        // bit still returns the state
        LAYERS = toggleVisibility(LAYERS, payload)

        return state
    } else {
        return toggleVisibility(state, payload)
    }
}

function toggleVisibility(state, name) {
    return state.withMutations(state => {
        const ids = LayerMappingIds.get(name)

        for (var index = 0; index < ids.length; index++) {
            const id = ids[index]
            const layer = state.find(layer => layer.id === id)
            const {layout} = layer

            state.set(state.indexOf(layer), {
                ...layer,
                layout: {
                    ...layout,
                    visibility: nextLayerVisibility.get(layout.visibility),
                }
            })
        }
    })
}

function getLegendId(layer) {
    return layer.id
}

const LayerMappingIds = new Map([
    [Layers.FORECASTS, ForecastLayers.map(getLegendId)],
    [Layers.HOT_ZONE_REPORTS, HotZoneReportLayers.map(getLegendId)],
    [Layers.MOUNTAIN_INFORMATION_NETWORK, MountainInformationNetworkLayers.map(getLegendId)],
])

const nextLayerVisibility = new Map([
    ['visible', 'none'],
    ['none', 'visible'],
])
