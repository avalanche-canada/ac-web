import * as requests from 'requests/min'
import { empty } from 'utils/fetch'
import { useCacheAsync, createKey, CACHE } from './'
import { DateParam } from 'hooks/params'
import Accessor from 'services/auth/accessor'

export function useReport(id) {
    // Hack for the map, so we can use "useReport" and pass null to get no report. See MIN layer!
    const key = createKey(KEY, id === null ? 'none' : id)
    const request = id === null ? empty : requests.report
    let cached

    if (REPORTS_KEYS.size > 0 && !CACHE.has(key) && id !== null) {
        const find = report => report.subid === id

        for (const key of REPORTS_KEYS) {
            if (!CACHE.has(key)) {
                continue
            }

            cached = CACHE.get(key, []).find(find)

            if (cached) {
                break
            }
        }
    }

    return useCacheAsync(request, [id], cached, key)
}

export function useReports(days = 7) {
    const key = createKey(KEY, 'days', days)

    REPORTS_KEYS.add(key)

    return useCacheAsync(requests.reports, [days], undefined, key)
}

export function useMINToWinReports(from, to) {
    const { format } = DateParam
    const key = createKey(KEY, 'from', format(from), 'to', format(to))

    return useCacheAsync(
        requests.minToWin,
        [from, to, Accessor.idToken],
        undefined,
        key
    )
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
