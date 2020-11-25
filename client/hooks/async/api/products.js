import * as React from 'react'
import * as Requests from 'requests/api'
import * as Products from 'constants/products'
import { useCacheAsync, createKey } from '../'
import { useLanguage } from 'contexts/intl'

export function useForecast(id) {
    const language = useLanguage()
    const params = [language, id]
    const key = createKey('products', params)

    return useCacheAsync(Requests.product, params, undefined, key)
}

export function useArchiveForecasts(date) {
    const language = useLanguage()
    const params = [language, date]
    const key = createKey('products', 'archive', language, date.toISOString())
    const [products = ARRAY, pending, error] = useCacheAsync(
        Requests.archive,
        params,
        undefined,
        key
    )

    return React.useMemo(
        () => [products.filter(product => Products.isKindOfForecast(product.type)), pending, error],
        [products, pending, error]
    )
}

const ARRAY = []
