import * as Api from 'api'
import {isApiAction} from 'api/utils'
import {ForecastRegion, HotZone} from 'api/schemas'
import {getResultsSet} from 'reducers/api/getters'

function shouldDispatchLoadAction(state) {
    const results = getResultsSet(state, ForecastRegion)

    return !results || (!results.isLoaded && !results.isFetching)
}

export default store => next => action => {
    if (!isApiAction(action)) {
        return next(action)
    }

    const state = store.getState()

    if (!shouldDispatchLoadAction(state)) {
        return Promise.resolve()
    }

    const {payload} = action
    const {types} = payload
    const delay = state.api.entities.has(ForecastRegion.getKey()) ? 10000 : 1

    function handleFulfill({data}) {
        next({
            type: types[1],
            payload: {
                entities: data
            },
            meta: payload,
        })

        return data
    }
    function handleReject(err) {
        const error = new Error('Can not fetch Avalanche Canada API metadata.', err)

        next({
            type: types[2],
            payload: error,
            error: true,
            meta: payload,
        })

        throw error
    }

    next({
        type: types[0],
        payload,
    })

    return new Promise(resolve => setTimeout(resolve, delay))
        .then(() => Api.fetchFeaturesMetadata())
        .then(handleFulfill, handleReject)
}
