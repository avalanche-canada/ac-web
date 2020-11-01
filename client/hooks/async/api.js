import * as requests from 'requests/api'
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
    const params = [language, date]
    const key = createKey('products', language, DateParam.format(date))

    return useCacheAsync(requests.products, params, undefined, key)
}

export function useArea(id) {
    const language = useLanguage()
    const params = [language, id]
    const key = createKey('product', params)

    return useCacheAsync(requests.area, params, undefined, key)
}

export function useAreas(date) {
    const language = useLanguage()
    const params = [language, date]
    const key = createKey('products', language, DateParam.format(date))

    return useCacheAsync(requests.areas, params, undefined, key)
}

export function useMarkers() {
    const language = useLanguage()
    const params = [language]
    const key = createKey('markers', params)

    return useCacheAsync(requests.markers, params, undefined, key)
}
