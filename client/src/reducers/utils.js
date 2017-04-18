import Immutable from 'immutable'

export function paramsToKey(params) {
    // please do not replace with paramsToKey(params = {}), it is not the same!!
    return Immutable.hash(params || {})
}

export function getPayload(state, {payload}) {
    return payload
}

export function getIds(result) {
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
