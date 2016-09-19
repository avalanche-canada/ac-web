import {ForecastRegion} from 'api/schemas'
import {createSource, setFeatures} from './utils'
import {point} from 'turf-helpers'

const {keys} = Object
const key = ForecastRegion.getKey()

export default createSource({
    id: key
})

export function addToSource(state, {payload}) {
    const regions = payload.entities[key] || {}
    const features = keys(regions).map(key => regions[key])

    return setFeatures(state, key, features)
}
