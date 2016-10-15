import {normalize} from 'normalizr'
import * as Api from 'api'
import {isPostAction} from 'api/utils'

export default store => next => action => {
    if (!isPostAction(action)) {
        return next(action)
    }

    const {type, payload} = action
    const {schema, data, types} = payload

    next({
        type: types[0],
        payload,
    })

    function handleFulfill({data}) {
        const normalized = normalize(data, schema)

        next({
            type: types[1],
            payload: normalized,
            meta: payload,
        })

        return normalized
    }
    function handleReject(err) {
        const error = new Error('Can not post to Avalanche Canada API.', err)

        next({
            type: types[2],
            payload: error,
            error: true,
            meta: payload,
        })

        throw error
    }

    return Api.post(schema, data).then(handleFulfill, handleReject)
}
