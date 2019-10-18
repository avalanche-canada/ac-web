import * as requests from 'requests/mcr'
import { useCacheAsync, createKey } from './'

export function useReport(id) {
    const key = createKey(KEY, id)

    return useCacheAsync(requests.report, [id], undefined, key)
}

export function useReports() {
    return useCacheAsync(requests.reports, undefined, undefined, KEY)
}

const KEY = createKey('mcr', 'reports')
