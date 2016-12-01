import {createSelector} from 'reselect'
import {ForecastRegion} from 'api/schemas'
import {getEntitiesForSchema} from 'getters/entities'
import getForecast from './forecast'

function getForecastRegions(state) {
    return getEntitiesForSchema(state, ForecastRegion)
}

const getRegionOptions = createSelector(
    getForecastRegions,
    regions => new Map(
        regions.map(region => [
            region.getIn(['properties', 'id']),
            region.getIn(['properties', 'name'])
        ]).toArray()
    )
)

export default createSelector(
    getRegionOptions,
    getForecast,
    (regionOptions, forecast) => ({
        ...forecast,
        regionOptions,
    })
)
