import {HotZoneArea} from 'api/schemas'

const key = HotZoneArea.getKey()

export default [{
    id: `${key}-line`,
    source: key,
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
}, {
    id: key,
    source: key,
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
}, {
    id: `${key}-labels`,
    source: key,
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
}]
