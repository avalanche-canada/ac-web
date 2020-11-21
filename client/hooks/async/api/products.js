import * as React from 'react'
import * as requests from 'requests/api'
import * as products from 'constants/products'
import { useCacheAsync, createKey } from '../'
import { useLanguage } from 'contexts/intl'
import { DateParam } from 'hooks/params'

export function useProduct(id) {
    const language = useLanguage()
    const params = [language, id]
    const key = createKey('product', params)

    return useCacheAsync(requests.product, params, undefined, key)
}

export function useProducts(date) {
    const language = useLanguage()
    const params = [language, DateParam.format(date)]
    const key = createKey('products', params)

    return useCacheAsync(requests.products, params, undefined, key)
}

export function useForecasts(date) {
    return useProductsOfType(products.FORECAST, date)
}

export function useForecast(id) {
    return useProductOfType(products.FORECAST, id)
}

export function useSPAW() {
    return useProductOfType(products.SPAW)
}

function useProductsOfType(type, date) {
    const [products = ARRAY, ...rest] = useProducts(date)

    return React.useMemo(
        () => [products.filter(product => product.type === type), ...rest],
        [type, products, ...rest]
    )
}

function useProductOfType(type, id) {
    const [products = ARRAY, ...rest] = useProductsOfType(type)

    return React.useMemo(
        () => [
            products.find(product => product.slug === id || product.id == id),
            ...rest,
        ],
        [type, id, products, ...rest]
    )
}

const ARRAY = []
