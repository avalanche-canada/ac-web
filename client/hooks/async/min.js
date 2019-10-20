import * as requests from 'requests/min'
import { empty } from 'utils/fetch'
import { useCacheAsync, createKey, CACHE } from './'

// TODO Implement cache per ids and serve it once available

export function useReport(id) {
    // TODO Hack for the map, so we can use "useReport" and pass null to get no report. See MIN layer!
    const key = createKey(KEY, id === null ? 'none' : id)
    const request = id === null ? empty : requests.report

    return useCacheAsync(request, [id], undefined, key)
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
