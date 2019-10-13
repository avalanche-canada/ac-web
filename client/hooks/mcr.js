import { Memory } from 'components/fetch/Cache'
import * as requests from 'api/urls/mcr'
import { useFetch } from 'utils/react/hooks'

export function useReport(id) {
    return useFetch(requests.report(id), CACHE)
}

export function useReports() {
    return useFetch(requests.reports(), CACHE)
}

const CACHE = new Memory()
