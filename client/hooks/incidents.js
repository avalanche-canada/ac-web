import { incident, incidents } from 'api/requests/incidents'
import { useCacheAsync, createKey } from 'hooks'

export function useIncident(id) {
    const key = createKey(KEY, id)

    return useCacheAsync(incident, [id], undefined, key)
}

export function useIncidents(params) {
    return useCacheAsync(incidents, [params], undefined, KEY)
}

const KEY = 'incidents'
