import {createSelector} from 'reselect'
import {HotZoneArea, HotZoneReport} from 'api/schemas'
import {getEntitiesForSchema} from 'reducers/api/getters'
import {createSource} from './utils'
import buffer from 'turf-buffer'
import {point, polygon} from 'turf-helpers'

const key = HotZoneArea.getKey()
const {assign} = Object

function getAreaFeatures(state) {
    return getEntitiesForSchema(state, HotZoneArea)
}

function getReportFeatures(state) {
    return getEntitiesForSchema(state, HotZoneReport)
}

const getTransformedFeatures = createSelector(
    [getAreaFeatures, getReportFeatures],
    (areas, reports) => areas.toList().toJSON().map(area => {
        // TODO: Remove that stuff once https://github.com/Turfjs/turf-buffer/pull/33 is closed
        const {properties} = area
        const {geometry} = buffer(point(properties.centroid), 25, 'kilometers')

        return assign(area, {
            geometry,
            properties: {
                ...properties,
                active: Number(reports.has(area.id)),
                title: properties.name,
            }
        })
    })
)

export default createSelector(
    getTransformedFeatures,
    features => createSource({
        id: key,
        features,
    })
)
