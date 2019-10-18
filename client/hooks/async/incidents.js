import { incident, incidents } from 'requests/incidents'
import { useCacheAsync, createKey } from './'

export function useIncident(id) {
    const key = createKey(KEY, id)

    return useCacheAsync(incident, [id], undefined, key)
}

export function useIncidents(...params) {
    const key = createKey(KEY, params)

    return useCacheAsync(incidents, params, undefined, key)
}

const KEY = 'incidents'
