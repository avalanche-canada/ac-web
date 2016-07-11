import {createSelector} from 'reselect'
import Immutable from 'immutable'
import {ForecastRegion, HotZoneArea} from 'api/schemas'
import {history} from 'router'

function handleForecastRegionClick(event, [feature]) {
    // TODO: Acces id directly when https://github.com/mapbox/mapbox-gl-js/issues/2716 gets fixed
    if (feature) {
        history.push(`/map/forecasts/${feature.properties.id}`)
    }
}
function handleForecastRegionMousemove(event, [feature]) {
    // TODO: Acces id directly when https://github.com/mapbox/mapbox-gl-js/issues/2716 gets fixed
    const map = event.target
    const canvas = map.getCanvas()
    const key = ForecastRegion.getKey()
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
function getActiveProps(state, {params, history}) {
    if (history.isActive(`/map/forecasts/${params.name}`)) {
        return {
            schema: ForecastRegion,
            id: params.name,
        }
    }
}

const LAYERS = Immutable.List.of({
        id: ForecastRegion.getKey(),
        source: ForecastRegion.getKey(),
        type: 'fill',
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
            click: handleForecastRegionClick,
            mousemove: handleForecastRegionMousemove,
        }
    }, {
        id: `${ForecastRegion.getKey()}-hover`,
        source: ForecastRegion.getKey(),
        type: 'fill',
        filter: ['==', 'id', ''],
        paint: {
            'fill-color': '#C8D3D9',
            'fill-opacity': {
                stops: [
                    [3, 1],
                    [8, 0],
                ]
            },
        },
    }, {
        id: `${ForecastRegion.getKey()}-active`,
        source: ForecastRegion.getKey(),
        type: 'fill',
        filter: ['==', 'id', ''],
        paint: {
            'fill-color': '#489BDF',
            'fill-opacity': {
                stops: [
                    [3, 1],
                    [8, 0],
                ]
            },
        },
    }, {
        id: `${ForecastRegion.getKey()}-contour`,
        source: ForecastRegion.getKey(),
        type: 'line',
        paint: {
            'line-color': '#B43A7E',
            'line-width': 1.5,
        },
        layout: {
            'line-join': 'round',
        }
    }, {
        id: `${ForecastRegion.getKey()}-contour-hover`,
        source: ForecastRegion.getKey(),
        type: 'line',
        filter: ['==', 'id', ''],
        paint: {
            'line-color': '#B43A7E',
            'line-width': 3,
        },
        layout: {
            'line-join': 'round',
        }
    }, {
        id: `${ForecastRegion.getKey()}-contour-active`,
        source: ForecastRegion.getKey(),
        type: 'line',
        filter: ['==', 'id', ''],
        paint: {
            'line-color': '#B43A7E',
            'line-width': 3,
        },
        layout: {
            'line-join': 'round',
        }
    }, {
        id: `${ForecastRegion.getKey()}-labels`,
        source: `${ForecastRegion.getKey()}-centroid`,
        type: 'symbol',
        minzoom: 4,
        layout: {
            'text-field': '{name}',
            'text-ignore-placement': true,
            'icon-image': 'harbor-15',
            'text-size': 12,
            'text-offset': [0, 0.6],
            'text-anchor': 'top',
        },
        paint: {
            'text-color': '#B43A7E',
            'text-halo-color': 'rgba(255, 255, 255, 0.5)',
            'text-halo-width': 1,
        },
    }, {
        id: `${ForecastRegion.getKey()}-contour-labels`,
        source: ForecastRegion.getKey(),
        type: 'symbol',
        minzoom: 8,
        layout: {
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
    }, {
        id: HotZoneArea.getKey(),
        source: HotZoneArea.getKey(),
        type: 'fill',
        paint: {
            'fill-color': '#ffffff',
            'fill-outline-color': '#FF00FF',
            'fill-opacity': 0.5
        },
    },
)

export default createSelector(
    getActiveProps,
    function computeLayers(active = null) {
        if (active === null) {
            return LAYERS
        }

        return LAYERS.withMutations(layers => {
            [ForecastRegion].forEach(schema => {
                ['active', 'contour-active'].forEach(suffix => {
                    const id = `${schema.getKey()}-${suffix}`
                    const index = layers.findIndex(layer => layer.id === id)
                    const value = schema === active.schema ? active.id : ''
                    const layer = {
                        ...layers.get(index),
                        filter: ['==', 'id', value],
                    }

                    layers.set(index, layer)
                })
            })
        })
    }
)
