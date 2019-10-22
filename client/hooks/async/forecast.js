import * as requests from 'requests/forecast'
import { useCacheAsync, createKey, CACHE } from './'

export function useForecast(id, date) {
    let request = requests.forecast
    const key = createKey(KEY, id, date)

    // Grab from the cache if already available
    if (!date && CACHE.has(KEY)) {
        const forecasts = CACHE.get(KEY)

        request = id => Promise.resolve(forecasts[id])
    }

    return useCacheAsync(request, [id, date], undefined, key)
}

export function useForecasts() {
    return useCacheAsync(requests.forecasts, undefined, undefined, KEY)
}

// Constants
const KEY = createKey('avalanche', 'forecasts')
