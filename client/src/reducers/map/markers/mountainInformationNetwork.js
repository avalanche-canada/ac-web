import {MountainInformationNetworkSubmission, MountainInformationNetworkObservation} from 'api/schemas'
import {createElement, POSITIONS} from './utils'
import {point} from 'turf-helpers'
import mapbox from 'mapbox/map'
import place from 'components/icons/place.svg'
import {MOUNTAIN_INFORMATION_NETWORK} from 'constants/map/layers'

const {keys} = Object
const {LngLat} = mapbox

const key = MountainInformationNetworkSubmission.getKey()
const obsKey = MountainInformationNetworkObservation.getKey()

export default []

function createMarkers({latlng, obs = []}) {
    const {length} = obs
    const [lat, lng] = latlng
    const lnglat = LngLat.convert([lng, lat])

    return obs.map(({obtype, obid}, index) => ({
        id: `${obsKey}:${obid}`,
        layer: MOUNTAIN_INFORMATION_NETWORK,
        location: {
            query: {
                panel: `${obsKey}/${obid}`,
            },
        },
        element: createElement({
            src: place,
            title: obtype,
            style: POSITIONS.get(length).get(index),
            width: 40,
            height: 40,
            className: 'hidden-map-marker',
        }),
        lnglat,
        options: {
            offset: [-25, -25]
        },
    }))
}

export function addToList(state, {payload}) {
    const submissions = payload.entities[key]

    if (!submissions) {
        return state
    }

    return keys(submissions).reduce((state, key) => (
        state.concat(createMarkers(submissions[key]))
    ), state)
}
