import Immutable from 'immutable'
import { combineReducers } from 'redux'
import {
    POST_MOUNTAIN_INFORMATION_NETWORK_SUBMISSION,
} from '~/actions/entities'
import * as Schemas from '~/api/schemas'
import { paramsToKey, getIds } from '~/reducers/utils'
import { Result } from '~/reducers/result'

export default combineReducers({
    entities,
    results,
})

function entities(state = new Immutable.Map(), { payload }) {
    if (payload && payload.entities) {
        // Has to be mergeDeep, merge only will get rid of existing features
        // Example: Initial WEATHER_STATIONS_SUCCESS will add all stations
        // and WEATHER_STATIONS_SUCCESS for a given one remove others...
        return state.mergeDeep(payload.entities)
    }

    return state
}

function results(
    state = new Immutable.Map(),
    { type, payload = {}, meta = {} }
) {
    if (type === `${POST_MOUNTAIN_INFORMATION_NETWORK_SUBMISSION}_FULFILLED`) {
        const { key } = Schemas.MountainInformationNetworkSubmission

        return state.set(key, new Immutable.Map())
    }

    if (!meta.schema) {
        return state
    }

    const { key } = meta.schema
    const path = [key, paramsToKey(meta.params)]

    state = state.update(key, results => results || new Immutable.Map())

    switch (type) {
        case `${meta.type}_PENDING`:
            return state.updateIn(path, (result = new Result()) =>
                result.start({
                    props: meta.params,
                })
            )
        case `${meta.type}_REJECTED`:
            return state.updateIn(path, result => result.reject())
        case `${meta.type}_FULFILLED`:
            return state.updateIn(path, result =>
                result.fulfill({
                    ids: new Set([...result.ids, ...getIds(payload.result)]),
                    count: payload.result.count,
                    next: payload.result.next,
                    previous: payload.result.previous,
                })
            )
        default:
            return state
    }
}
