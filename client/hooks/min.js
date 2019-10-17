import * as requests from 'requests/min'
import { useCacheAsync, createKey, CACHE } from 'hooks'

// TODO Implement cache per ids and serve it once available

export function useReport(id) {
    const key = createKey(KEY, id)

    return useCacheAsync(requests.report, [id], undefined, key)
}

export function useReports(days = 7) {
    const key = createKey(KEY, 'days', days)

    REPORTS_KEYS.add(key)

    return useCacheAsync(requests.reports, [days], undefined, key)
}

export function clearCachedReports() {
    for (const key of REPORTS_KEYS) {
        CACHE.remove(key)
    }
    REPORTS_KEYS.clear()
}

// Constants & utils
const KEY = createKey('min', 'submissions')
const REPORTS_KEYS = new Set()
