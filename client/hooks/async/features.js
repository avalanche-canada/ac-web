import { useMemo } from 'react'
import { useCacheAsync } from './'
import { metadata } from 'requests/metadata'
import { regions, archiveForecastRegions } from 'requests/forecast'

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

export function useArchiveForecastRegionsMetadata() {
    // TODO Accept a date parameter so list of region can update for a given date
    const season = '2019'
    const [data = {}, ...rest] = useCacheAsync(
        archiveForecastRegions,
        [season],
        undefined,
        'archive-forecast-regions-' + season
    )
    function convert() {
        return Object.entries(data)
            .map(([id, metadata]) => Object.assign({}, metadata, { id }))
            .sort(sorter)
    }
    const regions = useMemo(convert, [data])

    return [regions, ...rest]
}

export function useArchiveForecastRegionMetadata(id, date) {
    const [regions, ...rest] = useArchiveForecastRegionsMetadata(date)

    return [regions.find(region => region.id === id), ...rest]
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
