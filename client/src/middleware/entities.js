import {normalize, arrayOf} from 'normalizr'
import * as Api from 'api'
import {isApiAction} from 'api/utils'
import {getResultsSetForSchema} from 'reducers/api/getters'
import {paramsToKey} from 'api/utils'

function shouldDispatchLoadAction(state, schema, action) {
    const {params} = action.payload
    const sets = getResultsSetForSchema(state, schema)
    const key = paramsToKey(params)
    const results = sets.get(key)

    return !results || (!results.isLoaded && !results.isFetching)
}

export default store => next => action => {
    if (!isApiAction(action) || !action.payload.schema) {
        return next(action)
    }

    const {type, payload} = action
    const {schema, params, types} = payload
    const state = store.getState()

    if (!shouldDispatchLoadAction(state, schema, action)) {
        return Promise.resolve()
    }

    next({
        type: types[0],
        payload,
    })

    function handleFulfill({data}) {
        let shape = schema

        if (Array.isArray(data)) {
            shape = arrayOf(schema)
        } else if (Array.isArray(data.results)) {
            shape = {
                results: arrayOf(schema)
            }
        } else if (Array.isArray(data.features)) {
            shape = {
                features: arrayOf(schema)
            }
        }

        const normalized = normalize(data, shape)

        next({
            type: types[1],
            payload: normalized,
            meta: payload,
        })

        return normalized
    }
    function handleReject(err) {
        const error = new Error('Can not fetch Avalanche Canada API.', err)

        next({
            type: types[2],
            payload: error,
            error: true,
            meta: payload,
        })

        throw error
    }

    return Api.fetch(schema, params).then(handleFulfill, handleReject)
}
