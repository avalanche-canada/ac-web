import { paramsToKey } from 'reducers/utils'
import RESULT from 'reducers/result'

function path(schema, params) {
    return [schema.key, paramsToKey(params)]
}

export function getResultsSet(state, schema, params) {
    return state.api.results.getIn(path(schema, params), RESULT)
}

export function hasResultsSet(state, schema, params) {
    return state.api.results.hasIn(path(schema, params))
}
