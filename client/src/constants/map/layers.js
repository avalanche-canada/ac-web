import * as Schemas from 'api/schemas'
import * as Layers from 'constants/drawers'

const toyotaLayers = createToyotaLayers()
const weatherStationLayers = createWeatherStationLayers()
const mountainInformationNetworkLayers = createMountainInformationNetworkLayers()
const specialInformationLayers = createSpecialInformationLayers()

export default [
    ...toyotaLayers,
    ...weatherStationLayers,
    ...mountainInformationNetworkLayers,
    ...specialInformationLayers,
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

function createMountainInformationNetworkLayers() {
    const key = Layers.MOUNTAIN_INFORMATION_NETWORK

    return [{
        id: key,
        source: key,
        type: 'symbol',
        metadata: {
            'cluster-prefilter': [
                'all',
                ['any',
                    ['has', 'quick'],
                    ['has', 'avalanche'],
                    ['has', 'snowpack'],
                    ['has', 'weather'],
                    ['has', 'incident'],
                ],
                ['has', '7'],
            ]
        },
        filter: ['!has', 'point_count'],
        layout: {
            visibility: 'visible',
            'icon-image': '{icon}',
            'icon-allow-overlap': true,
            'icon-size': 0.75,
        },
    }, {
        id: `${key}-cluster`,
        source: key,
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
    }]
}

function createToyotaLayers() {
    const key = Layers.TOYOTA_TRUCK_REPORTS

    return [{
        id: key,
        source: key,
        type: 'symbol',
        layout: {
            visibility: 'visible',
            'icon-image': 'toyota-truck',
            'icon-size': 0.2,
            'icon-allow-overlap': true,
        },
    }]
}

function createSpecialInformationLayers() {
    const key = Layers.SPECIAL_INFORMATION

    return [{
        id: key,
        source: key,
        type: 'symbol',
        layout: {
            visibility: 'visible',
            'icon-image': 'embassy-15',
            'icon-size': 1.5,
            'icon-allow-overlap': true,
        },
    }]
}

function createWeatherStationLayers() {
    const key = Layers.WEATHER_STATION
    const iconSize = 0.75

    return [{
        id: key,
        source: key,
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
        source: key,
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

function pluckLayerId(layer) {
    return layer.id
}
