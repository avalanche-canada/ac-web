import {createSelector} from 'reselect'
import {List} from 'immutable'
import ForecastLayers, {labels as ForecastLabels} from './forecast'
import HotZoneReportLayers from './hotZoneReport'
import MountainInformationNetworkLayers from './mountainInformationNetwork'
import {getLayers as getVisibleLayers} from 'reducers/drawers'
import {setVisibility} from './utils'
import * as Layers from 'constants/map/layers'

const LAYERS = new List([
    ...ForecastLayers,
    ...HotZoneReportLayers,
    ...ForecastLabels,
    // ...MountainInformationNetworkLayers,
])

function getLegendId(layer) {
    return layer.id
}

const LayerMapping = new Map([
    [Layers.FORECASTS, [
        ...ForecastLayers,
        ...ForecastLabels,
    ]],
    [Layers.HOT_ZONE_REPORTS, HotZoneReportLayers],
    [Layers.MOUNTAIN_INFORMATION_NETWORK, MountainInformationNetworkLayers],
])

function layerIdReducer(all, name) {
    const ids = LayerMapping.get(name).map(getLegendId)

    return all.concat(ids)
}

const getVisibleIds = createSelector(
    getVisibleLayers,
    layers => new Set(Array.from(layers).reduce(layerIdReducer, []))
)

export default createSelector(
    getVisibleIds,
    ids => LAYERS.withMutations(layers => {
        layers.forEach((layer, index) => {
            layers.set(index, setVisibility(layer, ids.has(layer.id)))
        })
    })
)
