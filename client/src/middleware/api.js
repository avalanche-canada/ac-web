import * as actions from 'redux-actions'
import {normalize, arrayOf} from 'normalizr'
import * as Api from 'api'

const API = Symbol('AvCan Api Request')
const {isArray} = Array

export function isApiAction(action) {
    return action && action.type === API
}

export function createAction(schema, ...types) {
    return actions.createAction(API, params => ({
        schema,
        params,
        types,
    }))
}

export default store => next => action => {
    if (!isApiAction(action)) {
        return next(action)
    }

    const {type, payload} = action
    const {schema, params, types} = payload

    next({
        type: types[0],
        payload,
    })

    function handleFulfill({data}) {
        let normalized = null

        if (data.type === 'FeatureCollection') {
            normalized = normalize(data.features, arrayOf(schema))
        } else if (isArray(data)) {
            normalized = normalize(data, arrayOf(schema))
        } else {
            normalized = normalize(data, schema)
        }

        next({
            type: types[1],
            payload: {
                ...normalized,
                ...payload,
            },
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
