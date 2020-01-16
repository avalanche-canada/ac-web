import * as requests from 'requests/mcr'
import { useCacheAsync, createKey, CACHE } from './'
import { empty } from 'utils/fetch'

export function useReport(id) {
    // Hack for the map, so we can use "useReport" and pass null to get no report. See MCR layer!
    const key = createKey(KEY, id === null ? 'none' : id)
    const request = id === null ? empty : requests.report
    let cached

    if (CACHE.has(KEY) && !CACHE.has(key)) {
        const reports = CACHE.get(KEY)
        // == because received "id" could be a string
        const find = report => report.id == id

        cached = reports.find(find)
    }

    return useCacheAsync(request, [id], cached, key)
}

export function useReports() {
    return useCacheAsync(requests.reports, undefined, undefined, KEY)
}

const KEY = createKey('mcr', 'reports')
