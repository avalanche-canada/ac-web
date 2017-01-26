import {createAction} from 'redux-actions'
import Immutable from 'immutable'

const {fromJS, Iterable: {isIndexed}} = Immutable

const API = Symbol('AvCan Api Request')

export function createApiAction(...args) {
    let types = null
    let schema = null

    // TODO: Schema not required...just the type is enough information to send a request...

    if (args.length === 3) {
        types = args
    }

    if (args.length === 4) {
        [schema, ...types] = args
    }

    return createAction(API, params => ({
        schema,
        params,
        types,
    }))
}

export function isApiAction({type}) {
    return type === API
}

export function paramsToKey(params) {
    return fromJS(params || {}).hashCode()
}
