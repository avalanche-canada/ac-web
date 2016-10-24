import {MountainInformationNetworkSubmission} from 'api/schemas'

const key = MountainInformationNetworkSubmission.getKey()

export default [{
    id: `${key}-cluster-circle`,
    source: key,
    type: 'circle',
    layout: {
        visibility: 'visible',
    },
    paint: {
        'circle-color': '#4B6D6F',
        'circle-radius': 12,
    },
}, {
    id: `${key}-count-label`,
    source: key,
    type: 'symbol',
    layout: {
        visibility: 'visible',
        'text-field': '{point_count}',
        'text-size': 12,
    },
    paint: {
        'text-color': '#FFFFFF',
    },
}]
