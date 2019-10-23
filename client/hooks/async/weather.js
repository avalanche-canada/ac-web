import * as requests from 'requests/weather'
import { useCacheAsync, createKey, CACHE } from './'

export function useStation(id) {
    const key = createKey(KEY, id)
    let cached

    if (CACHE.has(KEY) && !CACHE.has(key)) {
        const stations = CACHE.get(KEY)
        // == because received id could be a string
        const find = station => station.stationId == id

        cached = stations.find(find)
    }

    return useCacheAsync(requests.station, [id], cached, key)
}

export function useStations() {
    return useCacheAsync(requests.stations, undefined, undefined, KEY)
}

export function useMeasurements(stationId) {
    const key = createKey(KEY, stationId, 'measurements')

    return useCacheAsync(requests.measurements, [stationId], undefined, key)
}

const KEY = createKey('weather', 'stations')
