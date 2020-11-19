import { useMemo, useCallback } from 'react'
import { useLocation } from 'router/hooks'
import { useWindowSize } from 'hooks'
import { isAnalysis, isObservations, computeProductParams } from 'utils/product'
import { useMap } from '../context'

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

        const panel = params.get('panel')
        const { product, id } = computeProductParams(panel)

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

export function useFlyTo() {
    const map = useMap()
    const offset = useMapOffset()

    return useCallback(
        (center, zoom = 13) => {
            map?.flyTo({
                center,
                zoom,
                offset,
            })
        },
        [map, offset]
    )
}

export function useFitBounds() {
    const map = useMap()
    const offset = useMapOffset()

    return useCallback(
        bounds => {
            map?.fitBounds(bounds, {
                offset,
                padding: 75,
                speed: 2.5,
            })
        },
        [map, offset]
    )
}

export function useMapOffset() {
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
