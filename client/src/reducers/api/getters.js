import {actionToKey} from 'api/utils'

export function getResultsSetForSchema(state, schema) {
    return state.api.results[schema.getKey()]
}

export function getResults(state, schema, key = null) {
    const resultsSet = getResultsSetForSchema(state, schema)

    return resultsSet ? resultsSet[String(key)] : null
}

export function shouldDispatchLoadAction(state, schema, action) {
    const key = actionToKey(schema, action)
    const results = getResults(state, schema, key)

    return !results || (!results.isLoaded && !results.isFetching)
}
