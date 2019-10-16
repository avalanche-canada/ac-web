import { forecast } from 'api/requests/forecast'
import { useCacheAsync, createKey } from 'hooks'

export function useForecast(name, date) {
    const params = [name, date]
    const key = createKey('avalanche', 'forecast', name, date)

    return useCacheAsync(forecast, params, undefined, key)
}
