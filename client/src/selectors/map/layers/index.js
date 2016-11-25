import {createSelector} from 'reselect'
import {List} from 'immutable'
import ForecastLayers, {labels as ForecastLabels} from './forecast'
import HotZoneReportLayers from './hotZoneReport'
import MountainInformationNetworkLayers from './mountainInformationNetwork'
import WeatherStationLayers from './weatherStation'
import {getLayers as getVisibleLayers} from 'getters/drawers'
import {setVisibility} from './utils'
import * as Layers from 'constants/map/layers'

const LAYERS = new List([
    ...ForecastLayers,
    ...HotZoneReportLayers,
    ...ForecastLabels,
    ...WeatherStationLayers,
    ...MountainInformationNetworkLayers,
])

function getLayerId(layer) {
    return layer.id
}

const LayerIds = new Map([
    [Layers.FORECASTS, [
        ...ForecastLayers,
        ...ForecastLabels,
    ].map(getLayerId)],
    [Layers.HOT_ZONE_REPORTS, HotZoneReportLayers.map(getLayerId)],
    [Layers.MOUNTAIN_INFORMATION_NETWORK, MountainInformationNetworkLayers.map(getLayerId)],
    [Layers.WEATHER_STATION, WeatherStationLayers.map(getLayerId)],
])

export function getLayerIds(name) {
    return LayerIds.get(name)
}

function layerIdReducer(all, name) {
    return all.concat(getLayerIds(name))
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
