import {ForecastRegion} from 'api/schemas'

const key = ForecastRegion.getKey()

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
    id: `${key}-hover`,
    source: key,
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
        'line-color': '#B43A7E',
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
        'line-color': '#B43A7E',
        'line-width': 3,
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
        'line-color': '#B43A7E',
        'line-width': 3,
    },
}, {
    id: `${key}-labels`,
    source: key,
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
}]
