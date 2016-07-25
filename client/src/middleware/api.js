import {normalize, arrayOf} from 'normalizr'
import * as Api from 'api'

export const API = Symbol('AvCan Api Request')

const api = store => next => action => {
    const {type, payload, meta} = action

    if (type !== API) {
        return next(action)
    }

    const {schema, params, types} = payload

    next({
        type: types[0],
        payload,
    })

    function handleFulfill({data}) {
        let normalized = null

        if (data.type === 'FeatureCollection') {
            normalized = normalize(data.features, arrayOf(schema))
        } else {
            normalized = normalize(data, schema)
        }

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

export default api
