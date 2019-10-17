import * as requests from 'requests/min'
import { useCacheAsync, createKey } from 'hooks'

// TODO Implement cache per ids and serve it once available

export function useReport(id) {
    const key = createKey(KEY, id)

    return useCacheAsync(requests.report, [id], undefined, key)
}

export function useReports(days = 7) {
    const key = createKey(KEY, 'days', days)

    return useCacheAsync(requests.reports, [days], undefined, key)
}

const KEY = createKey('min', 'submissions')
