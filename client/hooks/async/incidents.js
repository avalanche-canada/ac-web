import { incident, incidents } from 'requests/incidents'
import { useCacheAsync, createKey } from './'

export function useIncident(id) {
    const key = createKey(KEY, id)

    return useCacheAsync(incident, [id], undefined, key)
}

export function useIncidents(page, from, to) {
    const params = [page, from, to]
    const key = createKey(KEY, page, from, to)

    return useCacheAsync(incidents, params, undefined, key)
}

const KEY = 'incidents'
