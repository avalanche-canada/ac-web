import * as normalizr from 'normalizr'
import {createAction} from 'redux-actions'
import Immutable from 'immutable'
import * as Api from 'api'
import * as Schemas from 'api/schemas'
import * as Actions from 'actions/entities'
import {getResultsSet, hasResultsSet} from 'getters/api'
import {getEntitiesForSchema} from 'getters/entities'
import {DelayPromise} from 'utils/promise'

export function paramsToKey(params) {
    // please do not replace with paramsToKey(params = {}), it is not the same!!
    return Immutable.fromJS(params || {}).hashCode()
}

const normalizeFactory = schema => response => {
    const {data} = response
    let shape = schema

    if (Array.isArray(data)) {
        shape = [schema]
    } else if (Array.isArray(data.results)) {
        shape = {
            results: [schema]
        }
    } else if (Array.isArray(data.features)) {
        shape = {
            features: [schema]
        }
    }

    return normalizr.normalize(data, shape)
}

export function createFetchActionForSchema(type, schema) {
    const creator = createAction(
        type,
        params => Api.fetch(schema, params).then(normalizeFactory(schema)),
        params => ({
            schema,
            params,
            type,
        })
    )

    return params => (dispatch, getState) => {
        const state = getState()

        if (hasResultsSet(state, schema, params)) {
            const {isLoaded, isFetching} = getResultsSet(state, schema, params)

            if (isFetching || isLoaded) {
                return
            }
        }

        return dispatch(creator(params))
    }
}

export function createFetchMetadataAction() {
    const schema = Schemas.ForecastRegion
    const type = Actions.GET_FEATURES_METADATA
    function normalize(entities) {
        return {
            entities,
            result: Object.keys(entities[schema.key])
        }
    }
    const creator = createAction(
        type,
        () => Api.fetchFeaturesMetadata().then(normalize),
        () => ({type, schema}) // To have result to work
    )

    return () => (dispatch, getState) => {
        const state = getState()

        if (hasResultsSet(state, schema)) {
            const {isLoaded, isFetching} = getResultsSet(state, schema)

            if (isFetching || isLoaded) {
                return
            }
        }

        const delay = getEntitiesForSchema(state, schema).isEmpty() ? 1 : 10000

        return DelayPromise(delay).then(() => dispatch(creator()))
    }
}
