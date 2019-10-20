import * as requests from 'requests/mcr'
import { useCacheAsync, createKey } from './'
import { empty } from 'utils/fetch'

export function useReport(id) {
    const key = createKey(KEY, id === null ? 'none' : id)
    const request = id === null ? empty : requests.report

    return useCacheAsync(request, [id], undefined, key)
}

export function useReports() {
    return useCacheAsync(requests.reports, undefined, undefined, KEY)
}

const KEY = createKey('mcr', 'reports')
