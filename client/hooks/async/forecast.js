import * as requests from 'requests/forecast'
import { useCacheAsync, createKey, CACHE } from './'
import { DateParam } from 'hooks/params'

export function useForecast(id, date) {
    // Convert to string, so cache and hooks dependencies work as expected!
    // "date" can be different object on every, but being the same day!
    date = DateParam.serialize(date)

    const key = createKey(KEY, id, date)
    let cached

    // Grab from the cache if already available
    if (!date && CACHE.has(KEY) && !CACHE.has(key)) {
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
