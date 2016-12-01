import {createSelector} from 'reselect'
import {List} from 'immutable'
import MountainInformationNetworkLayers from './mountainInformationNetwork'
import HotZoneReportLayers from './hotZoneReport'
import WeatherStationLayers from './weatherStation'
import ToyotaLayers from './toyota'
import ForecastLayers, {labels as ForecastLabels} from './forecast'
import {getVisibleLayers} from 'getters/drawers'
import * as Layers from 'constants/map/layers'

const LAYERS = new List([
    ...ForecastLayers,
    ...HotZoneReportLayers,
    ...ForecastLabels,
    ...ToyotaLayers,
    ...WeatherStationLayers,
    ...MountainInformationNetworkLayers,
])

const VISIBILITY = new Map([
    [true, 'visible'],
    [false, 'none'],
])
function setVisibility(layer, visibility) {
    if (layer.layout.visibility === visibility) {
        return layer
    } else {
        return {
            ...layer,
            layout: {
                ...layer.layout,
                visibility
            }
        }
    }
}

function getLayerId(layer) {
    return layer.id
}

const LayerIds = new Map([
    [Layers.FORECASTS, ForecastLayers.map(getLayerId).concat(ForecastLabels.map(getLayerId))],
    [Layers.HOT_ZONE_REPORTS, HotZoneReportLayers.map(getLayerId)],
    [Layers.MOUNTAIN_INFORMATION_NETWORK, MountainInformationNetworkLayers.map(getLayerId)],
    [Layers.WEATHER_STATION, WeatherStationLayers.map(getLayerId)],
    [Layers.TOYOTA_TRUCK_REPORTS, ToyotaLayers.map(getLayerId)],
])

export function getLayerIds(name) {
    return LayerIds.get(name)
}

// Oh! Needs a more obvious to do that!
const getLayerVisibilityMap = createSelector(
    getVisibleLayers,
    visibleLayers => Array.from(LayerIds).reduce((visibilities, [id, layers]) => (
        layers.reduce((visibilities, layer) => (
            visibilities.set(layer, VISIBILITY.get(visibleLayers.has(id)))
        ), visibilities)
    ), new Map())
)

export default createSelector(
    getLayerVisibilityMap,
    visibilities => LAYERS.withMutations(layers => {
        layers.forEach((layer, index) => {
            layers.set(index, setVisibility(layer, visibilities.get(layer.id)))
        })
    })
)
