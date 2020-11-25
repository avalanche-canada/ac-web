import * as React from 'react'
import * as requests from 'requests/api'
import { useCacheAsync, createKey } from '../'
import { useLanguage } from 'contexts/intl'
import * as Products from 'constants/products'

export function useMetadata() {
    const language = useLanguage()
    const params = [language]
    const key = createKey('metadata', params)

    return useCacheAsync(requests.metadata, params, undefined, key)
}

export function useForecastMetadata() {
    return useMetadataOfType(Products.isKindOfForecast)
}

function useMetadataOfType(predicate) {
    const [metadata = ARRAY, pending, error] = useMetadata()

    return React.useMemo(
        () => [metadata.filter(meta => predicate(meta.product.type)), pending, error],
        [metadata, pending, error, predicate]
    )
}

const ARRAY = []
