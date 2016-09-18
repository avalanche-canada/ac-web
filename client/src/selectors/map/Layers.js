import {Map, OrderedMap, List, fromJS} from 'immutable'
import {
    ForecastRegion,
    HotZoneArea,
    MountainInformationNetworkSubmission,
} from 'api/schemas'
import * as LAYERS from 'constants/map/layers'

const forecastRegionKey = ForecastRegion.getKey()
const hotZoneAreaKey = HotZoneArea.getKey()
const mountainInformationNetworkSubmissionKey = MountainInformationNetworkSubmission.getKey()

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
        source: forecastRegionKey,
        type: 'symbol',
        minzoom: 4,
        layout: {
            visibility: 'visible',
            'text-field': '{name}',
            'text-size': 12,
        },
        paint: {
            'text-color': '#B43A7E',
            'text-halo-color': 'rgb(255, 255, 255)',
            'text-halo-width': 1,
        },
    },
})

const HotZoneReportLayers = new OrderedMap({
    [`${hotZoneAreaKey}-line`]: {
        id: `${hotZoneAreaKey}-line`,
        source: hotZoneAreaKey,
        type: 'line',
        layout: {
            visibility: 'visible',
            'line-join': 'round',
            'line-cap': 'round',
        },
        paint: {
            'line-color': {
                property: 'active',
                type: 'categorical',
                stops: [
                    [0, 'rgb(179, 179, 179)'],
                    [1, '#245eac'],
                ]
            },
            'line-width': 25,
        },
    },
    [hotZoneAreaKey]: {
        id: hotZoneAreaKey,
        source: hotZoneAreaKey,
        type: 'fill',
        layout: {
            visibility: 'visible',
        },
        paint: {
            'fill-color': {
                property: 'active',
                type: 'categorical',
                stops: [
                    [0, 'rgb(179, 179, 179)'],
                    [1, '#245EAC'],
                ]
            },
        },
    },
    [`${hotZoneAreaKey}-labels`]: {
        id: `${hotZoneAreaKey}-labels`,
        source: hotZoneAreaKey,
        type: 'symbol',
        layout: {
            visibility: 'visible',
            'text-field': '{name}',
            'text-size': 12,
        },
        paint: {
            'text-color': 'rgb(125, 125, 125)',
            'text-halo-color': 'rgb(255, 255, 255)',
            'text-halo-width': 1,
        },
    },
})

const MountainInformationNetworkLayers = new OrderedMap({
    // [mountainInformationNetworkSubmissionKey]: {
    //     id: mountainInformationNetworkSubmissionKey,
    //     source: mountainInformationNetworkSubmissionKey,
    //     type: 'symbol',
    //     layout: {
    //         visibility: 'visible',
    //         'icon-image': 'rocket-15',
    //     }
    // },
    [`${mountainInformationNetworkSubmissionKey}-cluster-circle`]: {
        id: `${mountainInformationNetworkSubmissionKey}-cluster-circle`,
        source: mountainInformationNetworkSubmissionKey,
        type: 'circle',
        layout: {
            visibility: 'visible',
        },
        paint: {
            'circle-color': '#4B6D6F',
            'circle-radius': 16,
        },
    },
    [`${mountainInformationNetworkSubmissionKey}-count-label`]: {
        id: `${mountainInformationNetworkSubmissionKey}-count-label`,
        source: mountainInformationNetworkSubmissionKey,
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

export default new OrderedMap({
    [LAYERS.FORECASTS]: ForecastLayers,
    [LAYERS.HOT_ZONE_REPORTS]: HotZoneReportLayers,
    [LAYERS.MOUNTAIN_INFORMATION_NETWORK]: MountainInformationNetworkLayers,
})
