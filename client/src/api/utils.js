import {createAction} from 'redux-actions'
import Immutable from 'immutable'

const {fromJS, Iterable: {isIndexed}} = Immutable

const API = Symbol('AvCan Api Request')
const POST = Symbol('AvCan Api POST Request')

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

export function createPostAction(schema, ...types) {
    return createAction(POST, data => ({
        schema,
        data,
        types,
    }))
}

export function isPostAction({type}) {
    return type === POST
}

function reviver(key, value) {
    // TODO: Find a way to consider real arrays > for orderings for example
    return isIndexed(value) ? value.toSet() : value.toMap()
}

export function paramsToKey(params) {
    return fromJS(params, reviver)
}
