import {combineReducers} from 'redux'
import Immutable from 'immutable'

const MAP = new Immutable.Map()

export default function entities(state = MAP, {payload}) {
    if (payload && payload.entities) {
        return state.mergeDeep(payload.entities)
    }

    return state
}

export function getEntitiesForSchema(state, schema) {
    const key = schema.getKey()

    return state.entities.get(key, MAP)
}

export function hasEntitiesForSchema(state, schema) {
    const key = schema.getKey()

    return state.entities.has(key)
}
