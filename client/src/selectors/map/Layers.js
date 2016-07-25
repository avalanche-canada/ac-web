import {Map, OrderedMap, List, fromJS} from 'immutable'
import {history} from 'router'
import {ForecastRegion, HotZoneArea} from 'api/schemas'
import * as LAYERS from 'constants/map/layers'

const {
    FORECASTS,
    HOT_ZONE_REPORTS,
} = LAYERS

const forecastRegionKey = ForecastRegion.getKey()
const hotZoneAreaKey = HotZoneArea.getKey()

const PATHS = new Map([
    [ForecastRegion, 'forecasts'],
    [HotZoneArea, 'hot-zone-reports'],
])

function handleFeatureClick(schema) {
    return function handleClick(event, [feature]) {
        // TODO: Acces id directly when https://github.com/mapbox/mapbox-gl-js/issues/2716 gets fixed: feature.properties.id > feature.id
        if (feature) {
            history.push(`/map/${PATHS.get(schema)}/${feature.properties.id}`)
        }
    }
}
function handleFeatureMousemove(schema) {
    const key = schema.getKey()

    return function handleMousemove(event, [feature]) {
        // TODO: Acces id directly when https://github.com/mapbox/mapbox-gl-js/issues/2716 gets fixed: feature.properties.id > feature.id
        const map = event.target
        const canvas = map.getCanvas()
        const layers = [`${key}-hover`, `${key}-contour-hover`]
        const filter = ['==', 'id', feature ? feature.properties.id : '']
        const cursor = feature ? 'pointer' : null

        canvas.style.cursor = cursor

        if (feature) {
            canvas.setAttribute('title', feature.properties.name)
        } else {
            canvas.removeAttribute('title')
        }

        layers.forEach(layer => map.setFilter(layer, filter))
    }
}

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
        events: {
            click: handleFeatureClick(ForecastRegion),
            mousemove: handleFeatureMousemove(ForecastRegion),
        }
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
        events: {
            click: handleFeatureClick(HotZoneArea),
            mousemove: handleFeatureMousemove(HotZoneArea),
        }
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


export default new Map({
    [FORECASTS]: ForecastLayers,
    [HOT_ZONE_REPORTS]: HotZoneReportLayers,
})
