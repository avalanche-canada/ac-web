import * as Layers from 'constants/drawers'

const toyotaLayers = [{
    id: Layers.TOYOTA_TRUCK_REPORTS,
    source: Layers.TOYOTA_TRUCK_REPORTS,
    type: 'symbol',
    layout: {
        visibility: 'visible',
        'icon-image': 'toyota-truck',
        'icon-size': 0.2,
        'icon-allow-overlap': true,
    },
}]
const weatherStationLayers = [{
    id: Layers.WEATHER_STATION,
    source: Layers.WEATHER_STATION,
    type: 'symbol',
    filter: ['!has', 'point_count'],
    layout: {
        visibility: 'visible',
        'icon-image': 'weather-station',
        'icon-allow-overlap': true,
        'icon-size': 0.75,
    },
}, {
    id: `${Layers.WEATHER_STATION}-cluster`,
    source: Layers.WEATHER_STATION,
    type: 'symbol',
    filter: ['has', 'point_count'],
    layout: {
        visibility: 'visible',
        'icon-image': 'weather-station',
        'icon-allow-overlap': true,
        'icon-size': 0.75,
        'text-font': ['Open Sans Extrabold'],
        'text-field': '{point_count}',
        'text-size': 12,
        'text-offset': [-0.75, 0],
    },
    paint: {
        'text-color': '#000000',
        'text-halo-color': '#FFFFFF',
        'text-halo-width': 2,
    },
}]
const mountainInformationNetworkLayers = [{
    id: Layers.MOUNTAIN_INFORMATION_NETWORK,
    source: Layers.MOUNTAIN_INFORMATION_NETWORK,
    type: 'symbol',
    filter: ['!has', 'point_count'],
    layout: {
        visibility: 'visible',
        'icon-image': '{icon}',
        'icon-allow-overlap': true,
        'icon-size': 0.75,
    },
}, {
    id: `${Layers.MOUNTAIN_INFORMATION_NETWORK}-cluster`,
    source: Layers.MOUNTAIN_INFORMATION_NETWORK,
    type: 'symbol',
    filter: ['has', 'point_count'],
    layout: {
        visibility: 'visible',
        'icon-image': 'min-pin',
        'icon-allow-overlap': true,
        'text-field': '{point_count}',
        'text-offset': [0, -0.25],
        'text-size': 12,
    },
    paint: {
        'text-color': '#FFFFFF',
        'text-halo-color': '#FFFFFF',
        'text-halo-width': 0.25,
    },
}, {
    id: Layers.MOUNTAIN_INFORMATION_NETWORK_INCIDENTS,
    source: Layers.MOUNTAIN_INFORMATION_NETWORK_INCIDENTS,
    type: 'symbol',
    layout: {
        visibility: 'visible',
        'icon-image': 'min-pin-with-incident',
        'icon-allow-overlap': true,
        'icon-size': 0.75,
    },
}]
const specialInformationLayers = [{
    id: Layers.SPECIAL_INFORMATION,
    source: Layers.SPECIAL_INFORMATION,
    type: 'symbol',
    layout: {
        visibility: 'visible',
        'icon-image': 'special-information',
        'icon-allow-overlap': true,
        'icon-size': 0.65,
    },
}]
const fatalAccidentLayers = [{
    id: Layers.FATAL_ACCIDENT,
    source: Layers.FATAL_ACCIDENT,
    type: 'symbol',
    layout: {
        visibility: 'visible',
        'icon-image': 'fatal-accident',
        'icon-allow-overlap': true,
        'icon-size': 0.75,
    },
}]
const atesLayers = [{
    id: Layers.ATES,
    source: Layers.ATES,
    type: 'raster'
}]


export default [
    ...toyotaLayers,
    ...weatherStationLayers,
    ...mountainInformationNetworkLayers,
    ...specialInformationLayers,
    ...fatalAccidentLayers,
    ...atesLayers
]

export const LayerIds = new Map([
    [Layers.FORECASTS, [
        'forecast-regions',
        'forecast-regions-active',
        'forecast-regions-contour',
        'forecast-regions-active-contour',
        'forecast-regions-labels',
    ]],
    [Layers.HOT_ZONE_REPORTS, [
        'hot-zones',
        'opened-hot-zones',
        'hot-zones-labels',
    ]],
    [Layers.MOUNTAIN_INFORMATION_NETWORK,
        mountainInformationNetworkLayers.map(pluckLayerId)
    ],
    [Layers.WEATHER_STATION,
        weatherStationLayers.map(pluckLayerId)
    ],
    [Layers.TOYOTA_TRUCK_REPORTS,
        toyotaLayers.map(pluckLayerId)
    ],
    [Layers.SPECIAL_INFORMATION,
        specialInformationLayers.map(pluckLayerId)
    ],
    [Layers.FATAL_ACCIDENT,
        fatalAccidentLayers.map(pluckLayerId)
    ],
    [Layers.ATES,
        atesLayers.map(pluckLayerId)
    ],
])

const isActiveRegExp = /-active/
function isActive(id) {
    return isActiveRegExp.test(id)
}
export const ActiveLayerIds = new Map(
    Array.from(LayerIds).map(([key, ids]) => [key, ids.filter(isActive)])
)

export const allLayerIds = Array.from(LayerIds).reduce(idsReducer, [])

function idsReducer(all, [layer, ids]) {
    return all.concat(ids)
}

function pluckLayerId(layer) {
    return layer.id
}
