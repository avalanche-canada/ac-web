import identity from 'lodash/identity'

export function createAction(type, payloadCreator = identity) {
    return (...params) => ({
        type,
        payload: payloadCreator(...params),
    })
}

export function merger(oldState, newState) {
    return {
        ...oldState,
        ...newState,
    }
}
