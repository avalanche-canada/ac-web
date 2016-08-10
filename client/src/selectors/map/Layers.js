import {Map, OrderedMap, List, fromJS} from 'immutable'
import {
    ForecastRegion,
    HotZoneArea,
    MountainInformationNetworkObservation,
} from 'api/schemas'
import * as LAYERS from 'constants/map/layers'

const forecastRegionKey = ForecastRegion.getKey()
const hotZoneAreaKey = HotZoneArea.getKey()
const mountainInformationNetworkObservationKey = MountainInformationNetworkObservation.getKey()

export function updateVisibility(layers, visibleLayers = new Set()) {
    return layers.map((layers, type) => {
        const visibility = visibleLayers.has(type) ? 'visible' : 'none'

        return layers
                .filter(layer => layer.visibility !== visibility)
                .map(layer => {
                    layer.layout = {
                        ...layer.layout,
                        visibility,
                    }

                    return layer
                })
    })
}

const ForecastLayers = new OrderedMap({
    [forecastRegionKey]: {
        id: forecastRegionKey,
        source: forecastRegionKey,
        type: 'fill',
        layout: {
            visibility: 'visible',
        },
        paint: {
            'fill-color': '#C8D3D9',
            'fill-opacity': {
                stops: [
                    [3, 1],
                    [8, 0],
                ]
            },
        },
    },
    [`${forecastRegionKey}-hover`]: {
        id: `${forecastRegionKey}-hover`,
        source: forecastRegionKey,
        type: 'fill',
        filter: ['==', 'id', ''],
        layout: {
            visibility: 'visible',
        },
        paint: {
            'fill-color': '#C8D3D9',
            'fill-opacity': {
                stops: [
                    [3, 1],
                    [8, 0],
                ]
            },
        },
    },
    [`${forecastRegionKey}-active`]: {
        id: `${forecastRegionKey}-active`,
        source: forecastRegionKey,
        type: 'fill',
        filter: ['==', 'id', ''],
        layout: {
            visibility: 'visible',
        },
        paint: {
            'fill-color': '#489BDF',
            'fill-opacity': {
                stops: [
                    [3, 1],
                    [8, 0],
                ]
            },
        },
    },
    [`${forecastRegionKey}-contour`]: {
        id: `${forecastRegionKey}-contour`,
        source: forecastRegionKey,
        type: 'line',
        layout: {
            visibility: 'visible',
            'line-join': 'round',
        },
        paint: {
            'line-color': '#B43A7E',
            'line-width': 1.5,
        },
    },
    [`${forecastRegionKey}-contour-hover`]: {
        id: `${forecastRegionKey}-contour-hover`,
        source: forecastRegionKey,
        type: 'line',
        filter: ['==', 'id', ''],
        layout: {
            visibility: 'visible',
            'line-join': 'round',
        },
        paint: {
            'line-color': '#B43A7E',
            'line-width': 3,
        },
    },
    [`${forecastRegionKey}-contour-active`]: {
        id: `${forecastRegionKey}-contour-active`,
        source: forecastRegionKey,
        type: 'line',
        filter: ['==', 'id', ''],
        layout: {
            visibility: 'visible',
            'line-join': 'round',
        },
        paint: {
            'line-color': '#B43A7E',
            'line-width': 3,
        },
    },
    [`${forecastRegionKey}-labels`]: {
        id: `${forecastRegionKey}-labels`,
        source: `${forecastRegionKey}-centroid`,
        type: 'symbol',
        minzoom: 4,
        layout: {
            visibility: 'visible',
            'text-field': '{name}',
            'text-ignore-placement': true,
            'text-size': 12,
            'text-offset': [0, 2.25],
            'text-anchor': 'top',
        },
        paint: {
            'text-color': '#B43A7E',
            'text-halo-color': 'rgba(255, 255, 255, 0.5)',
            'text-halo-width': 1,
        },
    },
    [`${forecastRegionKey}-contour-labels`]: {
        id: `${forecastRegionKey}-contour-labels`,
        source: forecastRegionKey,
        type: 'symbol',
        minzoom: 8,
        layout: {
            visibility: 'visible',
            'text-field': '{name}',
            'text-size': 12,
            'text-offset': [0, -0.2],
            'text-anchor': 'bottom',
            'symbol-placement': 'line',
            'text-keep-upright': false,
            'text-ignore-placement': true,
        },
        paint: {
            'text-color': '#B43A7E',
            'text-halo-color': 'rgba(255, 255, 255, 0.5)',
            'text-halo-width': 1,
        },
    },
})

const HotZoneReportLayers = new OrderedMap({
    [hotZoneAreaKey]: {
        id: hotZoneAreaKey,
        source: hotZoneAreaKey,
        type: 'fill',
        layout: {
            visibility: 'visible',
        },
        paint: {
            'fill-color': '#ffffff',
            'fill-outline-color': '#FF00FF',
            'fill-opacity': 0.5
        },
    },
    [`${hotZoneAreaKey}-hover`]: {
        id: `${hotZoneAreaKey}-hover`,
        source: hotZoneAreaKey,
        type: 'fill',
        filter: ['==', 'id', ''],
        layout: {
            visibility: 'visible',
        },
        paint: {
            'fill-color': '#C8D3D9',
            'fill-opacity': {
                stops: [
                    [3, 1],
                    [8, 0],
                ]
            },
        },
    },
    [`${hotZoneAreaKey}-contour-hover`]: {
        id: `${hotZoneAreaKey}-contour-hover`,
        source: hotZoneAreaKey,
        type: 'line',
        filter: ['==', 'id', ''],
        layout: {
            visibility: 'visible',
            'line-join': 'round',
        },
        paint: {
            'line-color': '#B43A7E',
            'line-width': 3,
        },
    },
})

const MountainInformationNetworkLayers = new OrderedMap({
    [mountainInformationNetworkObservationKey]: {
        id: mountainInformationNetworkObservationKey,
        source: mountainInformationNetworkObservationKey,
        type: 'symbol',
        layout: {
            visibility: 'visible',
            'icon-image': 'rocket-15',
        }
    },
    [`${mountainInformationNetworkObservationKey}-cluster-circle`]: {
        id: `${mountainInformationNetworkObservationKey}-cluster-circle`,
        source: mountainInformationNetworkObservationKey,
        type: 'circle',
        layout: {
            visibility: 'visible',
        },
        paint: {
            'circle-color': '#4B6D6F',
            'circle-radius': 16,
        },
    },
    [`${mountainInformationNetworkObservationKey}-count-label`]: {
        id: `${mountainInformationNetworkObservationKey}-count-label`,
        source: mountainInformationNetworkObservationKey,
        type: 'symbol',
        layout: {
            visibility: 'visible',
            'text-field': '{point_count}',
            'text-size': 12,
        },
        paint: {
            'text-color': '#FFFFFF',
        }
    },
})

export default new Map({
    [LAYERS.FORECASTS]: ForecastLayers,
    [LAYERS.HOT_ZONE_REPORTS]: HotZoneReportLayers,
    [LAYERS.MOUNTAIN_INFORMATION_NETWORK]: MountainInformationNetworkLayers,
})
