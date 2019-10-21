import { useMemo, useCallback } from 'react'
import bbox from '@turf/bbox'
import { getCoord } from '@turf/invariant'
import { useLocation } from 'router/hooks'
import { useWindowSize } from 'hooks'
import externals from 'router/externals'
import * as TYPES from 'constants/drawers'

export function usePrimaryDrawerParams() {
    const { location, navigate } = useLocation()
    const width = useDrawerWidth()
    const params = useMemo(() => {
        const [, type, id] = location.pathname
            .split('/')
            .filter(Boolean)
            .map(String)

        if (!PRIMARY.has(type) || externals.has(id)) {
            return BLANK_PARAMS
        }

        return {
            type,
            id,
            opened: true,
        }
    }, [location.pathname])

    return useMemo(
        () => ({
            ...params,
            width,
            close() {
                navigate('/map' + location.search)
            },
        }),
        [params, width, location.search]
    )
}

export function useSecondaryDrawerParams() {
    const { location, navigate } = useLocation()
    const width = useDrawerWidth()
    const params = useMemo(() => {
        const params = new URLSearchParams(location.search)

        if (!params.has('panel')) {
            return BLANK_PARAMS
        }

        const [type, id] = params
            .get('panel')
            .split('/')
            .filter(Boolean)
            .map(String)

        if (!SECONDARY.has(type)) {
            return BLANK_PARAMS
        }

        return {
            type,
            id,
            opened: true,
        }
    }, [location.search, width])

    return useMemo(
        () => ({
            ...params,
            width,
            close() {
                navigate(location.pathname)
            },
        }),
        [params, width, location.pathname]
    )
}
export function useFlyTo(map) {
    const offset = useMapOffset()

    return useCallback(
        (geometryOrFeature, zoom = 13) => {
            map.flyTo({
                center: getCoord(geometryOrFeature),
                zoom,
                offset,
            })
        },
        [map, offset]
    )
}
export function useFitBounds(map) {
    const offset = useMapOffset()

    return useCallback(
        geometryOrFeature => {
            map.fitBounds(bbox(geometryOrFeature), {
                offset,
                padding: 75,
                speed: 2.5,
            })
        },
        [map, offset]
    )
}

export function useMapClickHandler(map) {
    const { location, navigate } = useLocation()
    const flyTo = useFlyTo(map)

    return useCallback(
        event => {
            if (!map) {
                return
            }

            const [feature] = map.queryRenderedFeatures(event.point)

            if (!feature) {
                return
            }

            const { properties, geometry, source } = feature

            if (properties.cluster) {
                const source = map.getSource(feature.source)

                source.getClusterExpansionZoom(
                    properties.cluster_id,
                    (error, zoom) => {
                        if (error) {
                            return // We do not really care if there is an error
                        }

                        flyTo(geometry, zoom)
                    }
                )
            } else {
                const { id, name, externalUrl } = properties

                if (externalUrl) {
                    window.open(externalUrl, name)
                    return
                }

                let { pathname, search } = location

                if (PATHS.has(source)) {
                    pathname = `/map/${PATHS.get(source)}/${id}`
                }

                if (SEARCHS.has(source)) {
                    search = `?panel=${SEARCHS.get(source)}/${id}`
                }

                navigate(pathname + search)
            }
        },
        [map, location.pathname, location.search]
    )
}

// Utils
function useDrawerWidth() {
    const { width } = useWindowSize()

    return Math.min(MAX_DRAWER_WIDTH, width)
}
function useMapOffset() {
    const width = useDrawerWidth()
    const primary = usePrimaryDrawerParams()
    const secondary = useSecondaryDrawerParams()

    return useMemo(() => {
        let x = 0

        if (primary.opened) {
            x -= width / 4
        }

        if (secondary.opened) {
            x += width / 4
        }

        return [x, 0]
    }, [width, primary.opened, secondary.opened])
}

// Constants
const MAX_DRAWER_WIDTH = 500
const BLANK_PARAMS = {
    opened: false,
    type: null,
    id: null,
}
const PATHS = new Map([
    [TYPES.HOT_ZONE_REPORTS, 'advisories'],
    [TYPES.FORECASTS, 'forecasts'],
])
const SEARCHS = new Map([
    [TYPES.WEATHER_STATION, 'weather-stations'],
    [
        TYPES.MOUNTAIN_INFORMATION_NETWORK,
        'mountain-information-network-submissions',
    ],
    [
        TYPES.MOUNTAIN_INFORMATION_NETWORK + '-incidents',
        'mountain-information-network-submissions',
    ],
    [TYPES.FATAL_ACCIDENT, 'fatal-accidents'],
    [TYPES.MOUNTAIN_CONDITIONS_REPORTS, 'mountain-conditions-reports'],
])
const PRIMARY = new Set(PATHS.values())
const SECONDARY = new Set(SEARCHS.values()) // TODO Oups! It includes incidents as well, it needs to be fixed!
