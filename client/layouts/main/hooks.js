import { useMemo } from 'react'
import { useLocation } from 'router/hooks'

export function usePrimaryDrawerParams() {
    const { location } = useLocation()

    return useMemo(() => {
        const [, type, id] = location.pathname
            .split('/')
            .filter(Boolean)
            .map(String)

        if (!PRIMARY.has(type)) {
            return BLANK_PARAMS
        }

        return {
            type,
            id,
            opened: true,
        }
    }, [location.pathname])
}

export function useSecondaryDrawerParams() {
    const { location } = useLocation()

    return useMemo(() => {
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
    }, [location.search])
}

// Constants
const BLANK_PARAMS = {
    opened: false,
    type: null,
    id: null,
}
const PRIMARY = new Set(['forecasts', 'advisories'])
const SECONDARY = new Set([
    'mountain-information-network-submissions',
    'weather-stations',
    'fatal-accidents',
    'mountain-conditions-reports',
])
