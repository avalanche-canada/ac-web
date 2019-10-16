import { useMemo } from 'react'
import { useCacheAsync } from 'hooks'
import { metadata } from 'api/requests/metadata'
import { regions } from 'api/requests/forecast'

export function useForecastRegions() {
    return useCacheAsync(regions, undefined, undefined, 'regions')
}

export function useForecastRegionsMetadata() {
    return useMultiple(FORECAST_REGIONS)
}

export function useForecastRegionMetadata(id) {
    return useSingle(FORECAST_REGIONS, id)
}

export function useAdvisoriesMetadata() {
    return useMultiple(HOT_ZONES)
}

export function useAdvisoryMetadata(id) {
    return useSingle(HOT_ZONES, id)
}

// Utils
function useSingle(type, id) {
    const [meta, ...rest] = useMetadata()
    const data = meta?.[type]?.[id]

    return [data, ...rest]
}
function useMultiple(type) {
    const [meta, ...rest] = useMetadata()
    const data = useMemo(() => Object.values(meta?.[type] || {}).sort(sorter), [
        meta,
        type,
    ])

    return [data, ...rest]
}
function useMetadata() {
    return useCacheAsync(metadata, undefined, undefined, 'metadata')
}
const FORECAST_REGIONS = 'forecast-regions'
const HOT_ZONES = 'hot-zones-ah!-ah!'
function sorter(a, b) {
    return a.name.localeCompare(b.name)
}
