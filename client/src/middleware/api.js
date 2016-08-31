import {normalize, arrayOf} from 'normalizr'
import * as Api from 'api'
import {isApiAction} from 'api/utils'
import {shouldDispatchLoadAction} from 'reducers/api/getters'

const {isArray} = Array

export default store => next => action => {
    if (!isApiAction(action)) {
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

        if (isArray(data)) {
            shape = arrayOf(schema)
        } else if (isArray(data.results)) {
            shape = {
                results: arrayOf(schema)
            }
        } else if (isArray(data.features)) {
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
