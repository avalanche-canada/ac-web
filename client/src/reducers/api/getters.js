import {paramsToKey} from 'api/utils'

function getResultsSetForSchema(state, schema) {
    return state.api.results[schema.getKey()]
}

export function getResultsSet(state, schema, params) {
    const resultsSets = getResultsSetForSchema(state, schema)
    const key = paramsToKey(params)

    return resultsSets.get(key, null)
}

export function shouldDispatchLoadAction(state, schema, action) {
    const results = getResultsSet(state, schema, action.payload.params)

    return !results || (!results.isLoaded && !results.isFetching)
}
