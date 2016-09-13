import {createSelector} from 'reselect'
import {ForecastRegion} from 'api/schemas'
import {getEntitiesForSchema} from 'reducers/api/entities'

function getForecastRegions(state) {
    return getEntitiesForSchema(state, ForecastRegion)
}

function toEntry(region) {
    return [region.getIn(['properties', 'id']), region.getIn(['properties', 'name'])]
}

export default createSelector(
    getForecastRegions,
    regions => ({
        regionOptions: new Map(regions.map(toEntry).toArray())
    })
)
