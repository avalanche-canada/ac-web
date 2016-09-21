import {ForecastRegion} from 'api/schemas'

const key = ForecastRegion.getKey()
const COLOR = '#B43A7E'

export default [{
    id: key,
    source: key,
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
}, {
    id: `${key}-active`,
    source: key,
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
}, {
    id: `${key}-contour`,
    source: key,
    type: 'line',
    layout: {
        visibility: 'visible',
        'line-join': 'round',
    },
    paint: {
        'line-color': COLOR,
        'line-width': 1.5,
    },
}, {
    id: `${key}-contour-hover`,
    source: key,
    type: 'line',
    filter: ['==', 'id', ''],
    layout: {
        visibility: 'visible',
        'line-join': 'round',
    },
    paint: {
        'line-color': COLOR,
        'line-width': 4,
    },
}, {
    id: `${key}-contour-active`,
    source: key,
    type: 'line',
    filter: ['==', 'id', ''],
    layout: {
        visibility: 'visible',
        'line-join': 'round',
    },
    paint: {
        'line-color': COLOR,
        'line-width': 4,
    },
}]

export const labels = [{
    id: `${key}-main-labels`,
    source: `${key}-centroids`,
    type: 'symbol',
    minzoom: 4,
    layout: {
        visibility: 'visible',
        'text-field': '{name}',
        'text-size': 12,
        'text-offset': [0, 3],
        'text-padding': 10,
    },
    paint: {
        'text-color': COLOR,
        'text-halo-color': 'rgb(255, 255, 255)',
        'text-halo-width': 1,
    },
}, {
    id: `${key}-labels`,
    source: key,
    type: 'symbol',
    minzoom: 8,
    layout: {
        visibility: 'visible',
        'text-field': '{name}',
        'text-size': 12,
        'text-ignore-placement': true,
    },
    paint: {
        'text-color': COLOR,
        'text-halo-color': 'rgb(255, 255, 255)',
        'text-halo-width': 1,
    },
}]
