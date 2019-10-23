import * as requests from 'requests/forecast'
import { useCacheAsync, createKey, CACHE } from './'

export function useForecast(id, date) {
    const key = createKey(KEY, id, date)
    let cached

    // Grab from the cache if already available
    if (!date && CACHE.has(KEY)) {
        const forecasts = CACHE.get(KEY)

        cached = forecasts[id]
    }

    return useCacheAsync(requests.forecast, [id, date], cached, key)
}

export function useForecasts() {
    return useCacheAsync(requests.forecasts, undefined, undefined, KEY)
}

// Constants
const KEY = createKey('avalanche', 'forecasts')
