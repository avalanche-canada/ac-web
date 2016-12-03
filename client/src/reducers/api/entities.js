import {Map} from 'immutable'

export default function entities(state = new Map(), {payload, meta}) {
    if (payload && payload.entities) {
        return state.merge(payload.entities)
    }

    return state
}
