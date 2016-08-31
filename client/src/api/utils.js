import {createAction} from 'redux-actions'
import Immutable from 'immutable'

const {fromJS, Iterable: {isIndexed}} = Immutable

const API = Symbol('AvCan Api Request')

export function createApiAction(schema, ...types) {
    return createAction(API, params => ({
        schema,
        params,
        types,
    }))
}

export function isApiAction({type}) {
    return type === API
}

function reviver(key, value) {
    // TODO: Find a way to consider real arrays > for orderings for example
    return isIndexed(value) ? value.toSet() : value.toMap()
}

export function paramsToKey(params) {
    return fromJS(params, reviver)
}
