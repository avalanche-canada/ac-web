import * as requests from 'requests/weather'
import { useCacheAsync, createKey } from './'

export function useStation(id) {
    const key = createKey(KEY, id)

    return useCacheAsync(requests.station, [id], undefined, key)
}

export function useStations() {
    return useCacheAsync(requests.stations, undefined, undefined, KEY)
}

export function useMeasurements(stationId) {
    const key = createKey(KEY, stationId, 'measurements')

    return useCacheAsync(requests.measurements, [stationId], undefined, key)
}

const KEY = createKey('weather', 'stations')
