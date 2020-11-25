import * as React from 'react'
import * as Requests from 'requests/api'
import * as Products from 'constants/products'
import { useCacheAsync, createKey } from '../'
import { useLanguage } from 'contexts/intl'
import { DateParam } from 'hooks/params'

export function useForecasts(date) {
    return useProductsOfTypes(Products.isKindOfForecast, date)
}

export function useForecast(id) {
    return useProduct(id)
}

export function useSPAW() {
    return [undefined, false, null]
}

function useProductsOfTypes(type, date) {
    const [products = ARRAY, pending, error] = useProducts(date)

    return React.useMemo(
        () => [products.filter(product => product.type === type), pending, error],
        [type, products, pending, error]
    )
}

function useProduct(id) {
    const language = useLanguage()
    const params = [language, id]
    const key = createKey('product', params)

    return useCacheAsync(Requests.product, params, undefined, key)
}

function useProducts(date) {
    const language = useLanguage()
    const params = [language, date]
    const key = createKey('products', language, DateParam.format(date))

    return useCacheAsync(Requests.products, params, undefined, key)
}

const ARRAY = []
