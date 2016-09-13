import {Map, Set} from 'immutable'

const EMPTY_MAP = new Map()

export default function entities(state = EMPTY_MAP, {payload, meta}) {
    if (payload && payload.entities) {
        return state.mergeDeep(payload.entities)
    }

    return state
}

function getEntities(state) {
    return state.api.entities
}

export function getEntitiesForSchema(state, schema) {
    const key = schema.getKey()

    return getEntities(state).get(key, EMPTY_MAP)
}

export function getEntitiesForSchemaIds(state, schema, ids = []) {
    const entities = getEntitiesForSchema(schema)

    return ids.map(id => entities.get(id))
}

export function getEntityForSchema(state, schema, id) {
    return getEntitiesForSchema(state, schema).get(id)
}

export function hasEntitiesForSchema(state, schema) {
    const key = schema.getKey()

    return getEntities(state).has(key)
}
