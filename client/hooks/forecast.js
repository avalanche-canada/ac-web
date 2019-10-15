import { useMemo } from 'react'
import { Memory } from 'services/cache'
import * as urls from 'api/urls/forecast'
import { transformForecast } from 'api/transformers'
import { useFetch } from 'hooks'

export function useForecast(name, date) {
    const [data, pending] = useFetch(urls.forecast(name, date), CACHE)
    const forecast = useMemo(
        () => (data ? transformForecast(data) : undefined),
        [data]
    )

    return [forecast, pending]
}

const CACHE = new Memory(15 * 60 * 1000)
