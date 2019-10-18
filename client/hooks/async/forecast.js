import { forecast } from 'requests/forecast'
import { useCacheAsync, createKey } from './'

export function useForecast(name, date) {
    const params = [name, date]
    const key = createKey('avalanche', 'forecast', name, date)

    return useCacheAsync(forecast, params, undefined, key)
}
