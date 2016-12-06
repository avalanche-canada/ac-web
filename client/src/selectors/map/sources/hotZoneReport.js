import {createSelector} from 'reselect'
import {HotZoneArea, HotZoneReport} from 'api/schemas'
import {getEntitiesForSchema} from 'getters/entities'
import {createSource} from './utils'
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
        const {properties} = area
        const {geometry} = point(properties.centroid)

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
