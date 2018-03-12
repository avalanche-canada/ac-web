import { ForecastRegion, HotZone } from 'api/schemas'
import { LocalStorage } from 'services/storage'
import Immutable from 'immutable'

export configure from './configure'

const storage = LocalStorage.create()

// Defines the entities that will be cached
const ENTITY_KEYS = new Set([ForecastRegion.key, HotZone.key])
function canBeCached(value, key) {
    return ENTITY_KEYS.has(key)
}

export const serializeFactory = store => () => {
    const { api, sponsors } = store.getState()

    storage.set('state', {
        sponsors,
        api: {
            entities: api.entities.filter(canBeCached).toJSON(),
        },
    })
}

export function deserialize() {
    const { sponsors = {}, api = {} } = storage.get('state', {})

    return {
        sponsors,
        api: {
            entities: Immutable.fromJS(api.entities),
        },
    }
}
