import { useMemo } from 'react'
import { Memory } from 'components/fetch/Cache'
import { forecast } from 'api/urls/forecast'
import { transformForecast } from 'api/transformers'
import { useFetch } from 'utils/react/hooks'

export function useForecast(name, date) {
    const [data, pending] = useFetch(forecast(name, date), CACHE)

    return [useMemo(transformForecast, [data]), pending]
}

const CACHE = new Memory(15 * 60 * 1000)
