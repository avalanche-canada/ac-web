import * as Schemas from 'api/schemas'
import * as Layers from 'constants/drawers'
import once from 'lodash/once'

function createMountainInformationNetworkLayers() {
    // TODO: Do not to have two layers for cluster text and cluster symbol. So combine and test these two layers

    const key = Schemas.MountainInformationNetworkSubmission.getKey()

    return [{
        id: `${key}-submission`,
        source: Layers.MOUNTAIN_INFORMATION_NETWORK,
        type: 'symbol',
        filter: [
            'all',
            ['!has', 'point_count'],
        ],
        layout: {
            visibility: 'visible',
            'icon-image': '{icon}',
            'icon-allow-overlap': true,
            'icon-size': 0.75,
        },
    }, {
        id: `${key}-cluster-circle`,
        source: Layers.MOUNTAIN_INFORMATION_NETWORK,
        type: 'symbol',
        filter: ['has', 'point_count'],
        layout: {
            visibility: 'visible',
            'icon-image': 'min-pin',
            'icon-allow-overlap': true,
        },
    }, {
        id: `${key}-count-label`,
        source: Layers.MOUNTAIN_INFORMATION_NETWORK,
        type: 'symbol',
        layout: {
            visibility: 'visible',
            'text-field': '{point_count}',
            'text-offset': [0, -0.25],
            'text-size': 12,
        },
        paint: {
            'text-color': '#FFFFFF',
            'text-halo-color': '#FFFFFF',
            'text-halo-width': 0.25,
        },
    }]
}

function createToyotaLayers() {
    return [{
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
}

function createWeatherStationLayers() {
    const key = Schemas.WeatherStation.getKey()
    const iconSize = 0.75

    return [{
        id: key,
        source: Layers.WEATHER_STATION,
        type: 'symbol',
        filter: ['!has', 'point_count'],
        layout: {
            visibility: 'visible',
            'icon-image': 'weather-station',
            'icon-allow-overlap': true,
            'icon-size': iconSize,
        },
    }, {
        id: `${key}-cluster`,
        source: Layers.WEATHER_STATION,
        type: 'symbol',
        filter: ['has', 'point_count'],
        layout: {
            visibility: 'visible',
            'icon-image': 'weather-station',
            'icon-allow-overlap': true,
            'icon-size': iconSize,
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

}

const toyotaLayers = createToyotaLayers()
const weatherStationLayers = createWeatherStationLayers()
const mountainInformationNetworkLayers = createMountainInformationNetworkLayers()

function pluckLayerId(layer) {
    return layer.id
}

const layerIds = new Map([
    [Layers.FORECASTS, [
        'forecast-regions',
        'forecast-regions-active',
        'forecast-regions-contour',
        'forecast-regions-contour-hover',
        'forecast-regions-active-contour',
        'forecast-regions-labels',
    ]],
    [Layers.HOT_ZONE_REPORTS, [
        'hot-zones',
        'hot-zones-active',
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
])

export function getLayerIds(name) {
    return layerIds.get(name)
}

export const allLayerIds = Array.from(layerIds)
    .reduce((all, [layer, ids]) => all.concat(ids), [])

export default [
    ...toyotaLayers,
    ...weatherStationLayers,
    ...mountainInformationNetworkLayers,
]
