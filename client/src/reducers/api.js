import Immutable from 'immutable'
import {combineReducers} from 'redux'
import {paramsToKey} from 'api/utils'
import Status from 'utils/status'

const Result = Immutable.Record({
    isFetching: false,
    isLoaded: false,
    isError: false,
    ids: new Set(),
    count: null,
    next: null,
    previous: null,
    // TODO: Look if this is used!!!
    props: {},
})

Object.assign(Result.prototype, {
    start(props = {}) {
        return this.merge({
            ...props,
            isFetching: true,
            isLoaded: false,
            isError: false,
        })
    },
    fulfill(props = {}) {
        return this.merge({
            ...props,
            isFetching: false,
            isLoaded: true,
        })
    },
    reject() {
        return this.merge({
            isFetching: false,
            isError: true,
        })
    },
    asStatus(messages = {}) {
        return new Status({
            isLoading: this.isFetching,
            isLoaded: this.isLoaded,
            isError: this.isError,
            messages,
        })
    }
})

function getIds(result) {
    if (!result) {
        return new Set()
    }

    if (Array.isArray(result)) {
        return result
    } else if (Array.isArray(result.results)) {
        return result.results
    } else if (Array.isArray(result.features)) {
        return result.features
    } else {
        return [result]
    }
}

export const RESULT = new Result()

function entities(state = new Immutable.Map(), {payload}) {
    if (payload && payload.entities) {
        // Has to be mergeDeep, merge only will get rid of existing features
        // Example: Initial WEATHER_STATIONS_SUCCESS will add all stations
        // and WEATHER_STATIONS_SUCCESS for a given one remove others...
        return state.mergeDeep(payload.entities)
    }

    return state
}

function results(state = new Immutable.Map(), {type, payload = {}, meta = {}}) {
    if (!meta.schema) {
        return state
    }

    const path = [meta.schema.key, paramsToKey(meta.params)]

    if (type === `${meta.type}_PENDING`) {
        return state.updateIn(
            path,
            (result = new Result()) => result.start({
                props: meta.params
            })
        )
    }

    if (type === `${meta.type}_REJECTED`) {
        return state.updateIn(
            path,
            result => result.reject()
        )
    }

    if (type === `${meta.type}_FULFILLED` && payload.result) {
        return state.updateIn(
            path,
            result => result.fulfill({
                ids: new Set([...result.ids, ...getIds(payload.result)]),
                count: payload.result.count,
                next: payload.result.next,
                previous: payload.result.previous,
            })
        )
    }

    return state
}

export default combineReducers({
    entities,
    results,
})
