import {HotZoneArea} from 'api/schemas'

const key = HotZoneArea.getKey()

export default [{
    id: key,
    source: key,
    type: 'circle',
    layout: {
        visibility: 'visible',
    },
    paint: {
        'circle-color': {
            property: 'active',
            type: 'categorical',
            stops: [
                [0, 'rgb(100, 100, 100)'],
                [1, '#245eac'],
            ]
        },
        'circle-opacity': 0.9,
        'circle-blur': 0.75,
        'circle-radius': {
            stops: [
                [4, 25],
                [8, 100],
                [10, 400],
                [12, 700],
                [15, 1000],
                [20, 2500],
            ]
        },
    },
}, {
    id: `${key}-labels`,
    source: key,
    type: 'symbol',
    minzoom: 5.25,
    layout: {
        visibility: 'visible',
        'text-field': '{name}',
        'text-size': 12,
    },
    paint: {
        'text-color': 'rgb(50, 50, 50)',
        'text-halo-color': 'rgb(255, 255, 255)',
        'text-halo-width': 1,
    },
}]
