import {MountainInformationNetworkSubmission} from 'api/schemas'
import {createSource, setFeatures} from './utils'
import {point} from 'turf-helpers'

const {keys} = Object
const key = MountainInformationNetworkSubmission.getKey()

export default createSource({
    id: key,
    cluster: true,
})

export function addToSource(state, {payload}) {
    const submissions = payload.entities[key]

    if (!submissions) {
        return state
    }

    const features = keys(submissions).map(key => {
        const {latlng, ...properties} = submissions[key]
        const [lat, lng] = latlng

        return point([lng, lat], properties)
    })

    return setFeatures(state, key, features)
}
