import {MountainInformationNetworkSubmission} from 'api/schemas'

const key = MountainInformationNetworkSubmission.getKey()

export default [{
    id: `${key}-submission`,
    source: key,
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
    source: key,
    type: 'symbol',
    filter: ['has', 'point_count'],
    layout: {
        visibility: 'visible',
        'icon-image': 'min-pin',
        'icon-allow-overlap': true,
    },
}, {
    id: `${key}-count-label`,
    source: key,
    type: 'symbol',
    layout: {
        visibility: 'visible',
        'text-field': '{point_count}',
        'text-offset': [0, -0.25],
        'text-size': 12,
    },
    paint: {
        'text-color': '#FFFFFF',
    },
}]
