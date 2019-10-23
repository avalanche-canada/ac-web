import * as requests from 'requests/incidents'
import { useCacheAsync, createKey } from './'

export function useIncident(id) {
    const key = createKey(KEY, id)

    return useCacheAsync(requests.incident, [id], undefined, key)
}

export function useIncidents(...params) {
    const key = createKey(KEY, params)

    return useCacheAsync(requests.incidents, params, undefined, key)
}

const KEY = 'incidents'
