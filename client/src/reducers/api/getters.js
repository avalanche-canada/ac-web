import {paramsToKey} from 'api/utils'
import {RESULT} from './results'
import {getEntityForSchema} from './entities'
import {ForecastRegion} from 'api/schemas'

export {getEntitiesForSchema} from './entities'

export function getResultsSetForSchema(state, schema) {
    return state.api.results[schema.getKey()]
}

export function getResultsSet(state, schema, params) {
    const sets = getResultsSetForSchema(state, schema)
    const key = paramsToKey(params)

    return sets.get(key, RESULT)
}

export function shouldDispatchLoadAction(state, schema, action) {
    const {params} = action.payload
    const sets = getResultsSetForSchema(state, schema)
    const key = paramsToKey(params)
    const results = sets.get(key)

    return !results || (!results.isLoaded && !results.isFetching)
}

export function getForecastRegionExternalUrl(state, forecastRegionId) {
    const forecastRegion = getEntityForSchema(state, ForecastRegion, forecastRegionId)

    return forecastRegion ? forecastRegion.getIn(['properties', 'externalUrl']) : undefined
}
