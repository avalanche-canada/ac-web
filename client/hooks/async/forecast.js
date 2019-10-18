import { forecast } from 'requests/forecast'
import { useCacheAsync, createKey } from './'

export function useForecast(...params) {
    const key = createKey('avalanche', 'forecast', params)

    return useCacheAsync(forecast, params, undefined, key)
}
