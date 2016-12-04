import {createSelector} from 'reselect'
import {HotZone, HotZoneReport} from 'api/schemas'
import {getEntitiesForSchema} from 'getters/entities'
import {createSource} from './utils'
import {point} from 'turf-helpers'

function getAreaFeatures(state) {
    return getEntitiesForSchema(state, HotZone)
}

function getReportFeatures(state) {
    return getEntitiesForSchema(state, HotZoneReport)
}

const getTransformedFeatures = createSelector(
    getAreaFeatures,
    getReportFeatures,
    (areas, reports) => areas.map(area => {
        const properties = area.get('properties')
        const {geometry} = point(properties.get('centroid').toArray())

        return Object.assign(area, {
            geometry,
            properties: {
                active: Number(reports.has(area.get('id'))),
                title: properties.get('name'),
            }
        })
    }).toList()
)

export default createSelector(
    getTransformedFeatures,
    features => createSource({
        id: HotZone.getKey(),
        features,
    })
)
