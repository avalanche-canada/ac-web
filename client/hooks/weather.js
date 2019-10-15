import { useMemo } from 'react'
import { Memory } from 'components/fetch/Cache'
import * as urls from 'api/urls/weather'
import { useFetch } from 'hooks'

export function useStation(id) {
    return useFetch(urls.station(id), STATIONS)
}

export function useStations() {
    const [data, pending] = useFetch(urls.stations(), STATIONS)
    const stations = useMemo(
        () => (Array.isArray(data) ? data.sort(sorter) : data),
        [data]
    )

    return [stations, pending]
}

export function useMeasurements(id) {
    return useFetch(urls.measurements(id))
}

// Constants & utils
const STATIONS = new Memory()
function sorter(a, b) {
    return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
}
