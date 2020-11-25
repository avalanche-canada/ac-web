import * as React from 'react'
import * as Requests from 'requests/api'
import * as Products from 'constants/products'
import { useCacheAsync, createKey } from '../'
import { useLanguage } from 'contexts/intl'
import { DateParam } from 'hooks/params'

export function useProduct(id) {
    const language = useLanguage()
    const params = [language, id]
    const key = createKey('product', params)

    return useCacheAsync(Requests.product, params, undefined, key)
}

export function useProducts(date) {
    const language = useLanguage()
    const params = [language, date]
    const key = createKey('products', language, DateParam.format(date))

    return useCacheAsync(Requests.products, params, undefined, key)
}

export function useForecasts(date) {
    return useProductsOfTypes(Products.isKindOfForecast, date)
}

export function useForecast(id) {
    return useProductOfTypes(Products.isKindOfForecast, id)
}

export function useSPAW() {
    return useProductOfTypes(Products.SPAW)
}

function useProductsOfTypes(typeOrPredicate, date) {
    const [products = ARRAY, ...rest] = useProducts(date)

    return React.useMemo(
        () => [
            products.filter(product =>
                typeof typeOrPredicate === 'function'
                    ? typeOrPredicate(product.type)
                    : product.type === typeOrPredicate
            ),
            ...rest,
        ],
        [typeOrPredicate, products, ...rest]
    )
}

function useProductOfTypes(types, id) {
    const [products = ARRAY, ...rest] = useProductsOfTypes(types)

    return React.useMemo(
        () => [products.find(product => product.slug === id || product.id == id), ...rest],
        [types, id, products, ...rest]
    )
}

const ARRAY = []
