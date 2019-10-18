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

// Utils
function useMetadata() {
    return useCacheAsync(metadata, undefined, undefined, 'metadata')
}
function useSingle(type, id) {
    const metadata = useMetadata()

    return useMemo(() => {
        const [data, ...rest] = metadata

        return [data?.[type]?.[id], ...rest]
    }, metadata)
}
function useMultiple(type) {
    const metadata = useMetadata()
    return useMemo(() => {
        const [data, ...rest] = metadata

        return [
            Object.values(data?.[type] || {})
                .filter(item => !item._legacy)
                .sort(sorter),
            ...rest,
        ]
    }, metadata)
}
const FORECAST_REGIONS = 'forecast-regions'
const HOT_ZONES = 'hot-zones'
function sorter(a, b) {
    return a.name.localeCompare(b.name)
}
