import {paramsToKey} from 'api/utils'
import {RESULT} from './results'

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
    const results = getResultsSet(state, schema, action.payload.params)

    return !results || (!results.isLoaded && !results.isFetching)
}
