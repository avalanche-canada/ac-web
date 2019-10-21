import { useMemo } from 'react'
import { useCacheAsync } from './'
import { metadata } from 'requests/metadata'
import { regions } from 'requests/forecast'

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

// Constants & utils
const FORECAST_REGIONS = 'forecast-regions'
const HOT_ZONES = 'hot-zones'
function useMetadata() {
    return useCacheAsync(metadata, undefined, undefined, 'metadata')
}
function useSingle(type, id) {
    const [data, ...rest] = useMetadata()
    const single = useMemo(() => data?.[type]?.[id], [type, id, data])

    return [single, ...rest]
}
function useMultiple(type) {
    const [data, ...rest] = useMetadata()
    const multiple = useMemo(
        () =>
            // Could be moved to the "request", but due to the object structure it does not make sense
            Object.values(data?.[type] || {})
                .filter(item => !item._legacy)
                .sort(sorter),
        [type, data]
    )

    return [multiple, ...rest]
}
function sorter(a, b) {
    return a.name.localeCompare(b.name)
}
