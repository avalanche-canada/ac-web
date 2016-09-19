import {HotZoneArea, HotZoneReport} from 'api/schemas'
import {createSource, setFeatures} from './utils'
import {point} from 'turf-helpers'

const {keys, assign} = Object

const key = HotZoneArea.getKey()
const reportKey = HotZoneReport.getKey()

let AREAS = {}
let REPORTS = {}

export default createSource({
    id: key
})

export function addToSource(state, {payload: {entities}}) {
    AREAS = entities[key] || AREAS
    REPORTS = entities[reportKey] || REPORTS

    const features = keys(AREAS).map(key => {
        const {properties, ...area} = AREAS[key]

        return assign(area, {
            properties: {
                ...properties,
                active: Number(REPORTS.hasOwnProperty(key)),
            }
        })
    })

    return setFeatures(state, key, features)
}
