import { useMemo, useCallback } from 'react'
import bbox from '@turf/bbox'
import { getCoord } from '@turf/invariant'
import { useLocation } from 'router/hooks'
import { useWindowSize } from 'hooks'
import * as urls from 'utils/url'
import { isAnalysis, isObservations, computeProductParams } from 'utils/product'

export function usePrimaryDrawer() {
    const { location, navigate } = useLocation()
    const { search, pathname } = location

    return useMemo(() => {
        const { product, id } = computeProductParams(pathname)

        if (!product || !id) {
            return BLANK_PARAMS
        }

        return {
            product,
            id,
            opened: isAnalysis(product),
            close() {
                navigate('/map' + search)
            },
        }
    }, [pathname, search])
}

export function useSecondaryDrawer() {
    const { location, navigate } = useLocation()
    const { search, pathname } = location

    return useMemo(() => {
        const params = new URLSearchParams(search)

        if (!params.has('panel')) {
            return BLANK_PARAMS
        }

        const { product, id } = computeProductParams(params.get('panel'))

        return {
            product,
            id,
            opened: isObservations(product),
            close() {
                navigate(pathname)
            },
        }
    }, [search, pathname])
}
export function useFlyTo(map) {
    const offset = useMapOffset()

    return useCallback(
        (geometryOrFeature, zoom = 13) => {
            if (!map) {
                return
            }

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
            if (!map) {
                return
            }

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

            const { properties } = feature

            if (properties.cluster) {
                const source = map.getSource(feature.source)

                source.getClusterExpansionZoom(
                    properties.cluster_id,
                    (error, zoom) => {
                        if (error) {
                            // We do not really care if there is an error,
                            // we will just zoom in a bit so user receives a
                            // feedback to the click on the cluster!
                            zoom = map.getZoom() + 1
                        }

                        flyTo(feature.geometry, zoom)
                    }
                )
            } else {
                if ('url' in properties) {
                    const { url, slug } = properties

                    window.open(url, slug)
                } else {
                    const { pathname = location.pathname } = properties
                    let { search } = location

                    if ('panel' in properties) {
                        search = `?panel=${properties.panel}`
                    }

                    navigate(pathname + search)
                }
            }
        },
        [map, location.pathname, location.search]
    )
}

// Utils
function useMapOffset() {
    const primary = usePrimaryDrawer()
    const secondary = useSecondaryDrawer()
    const size = useWindowSize()
    const width = Math.min(500, size.width)

    return useMemo(() => {
        let x = 0

        if (primary.opened && size.width > WIDTH_TO_START_ADD_MAP_OFFSET) {
            x -= width / 4
        }

        if (secondary.opened && size.width > WIDTH_TO_START_ADD_MAP_OFFSET) {
            x += width / 4
        }

        return [x, 0]
    }, [size.width, primary.opened, secondary.opened])
}

// Constants
const WIDTH_TO_START_ADD_MAP_OFFSET = 750
const BLANK_PARAMS = {
    opened: false,
}
