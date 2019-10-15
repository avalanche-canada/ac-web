import { useMemo } from 'react'
import { Memory } from 'services/cache'
import * as urls from 'api/urls/min'
import { sanitizeMountainInformationNetworkSubmission } from 'api/transformers'
import { useFetch } from 'hooks'

// TODO Implement cache per ids and serve it once available

export function useReport(id) {
    const [data, pending] = useFetch(urls.report(id), CACHE)
    const report = useMemo(() => {
        return data
            ? sanitizeMountainInformationNetworkSubmission(data)
            : undefined
    }, [data])

    return [report, pending]
}

export function useReports(days = 7) {
    const [data, pending] = useFetch(urls.reports(days), CACHE)
    const reports = useMemo(() => {
        return Array.isArray(data)
            ? data
                  .map(sanitizeMountainInformationNetworkSubmission)
                  .sort(sorter)
            : undefined
    }, [data])

    return [reports, pending]
}

export const CACHE = new Memory()

// Utils
function sorter(a, b) {
    return a.datetime < b.datetime
}
