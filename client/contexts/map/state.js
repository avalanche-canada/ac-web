import React, {
    createContext,
    useMemo,
    useContext,
    useRef,
    useState,
} from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'
import { useSessionStorage, useCurrentPosition } from 'hooks'

const MapStateContext = createContext()

Provider.propTypes = {
    children: PropTypes.element.isRequired,
}

export function Provider({ children }) {
    const value = useContextValue()

    return (
        <MapStateContext.Provider value={value}>
            {children}
        </MapStateContext.Provider>
    )
}

function useContextValue() {
    const [zoom, setZoom] = useSessionStorage('zoom', ZOOM)
    const [center, setCenter] = useSessionStorage('center', CENTER)
    const errors = useErrors()

    return useMemo(
        () => ({
            zoom: {
                value: zoom,
                set: setZoom,
            },
            center: {
                value: center,
                set: setCenter,
            },
            errors,
        }),
        [zoom, center, errors]
    )
}

export function useMapState() {
    return useContext(MapStateContext)
}

export function useGuessBounds() {
    const { zoom, center } = useContextValue()
    const position = useCurrentPosition()

    if (position.status !== 'resolved') {
        return
    }

    // User has changed one of the value, we are not guessing bounds
    if (zoom.value !== ZOOM || center.value !== CENTER) {
        return
    }

    const point = [position.longitude, position.latitude]
    const Bounds = mapboxgl.LngLatBounds

    return BOUNDS.find(bounds => Bounds.convert(bounds).contains(point))
}

function useErrors() {
    const ERRORS = useRef(new Set())
    const [value, setValue] = useState(new Map())

    return useMemo(
        () => ({
            value,
            total: Array.from(value.values()).reduce(counter, 0),
            add(type, error) {
                if (ERRORS.current.has(error)) {
                    return
                }

                setValue(() => {
                    ERRORS.current.add(error)

                    if (!value.has(type)) {
                        value.set(type, new Set())
                    }

                    value.get(type).add(error)

                    return new Map(value)
                })
            },
            clear() {
                ERRORS.current.clear()
                setValue(new Map())
            },
        }),
        [value]
    )
}

// Constants
export const ERRORS = {
    FORECAST: Symbol('fx'),
    WEATHER_STATION: Symbol('wx'),
    MOUNTAIN_CONDITIONS_REPORT: Symbol('mcr'),
    INCIDENT: Symbol('incident'),
    ADVISORY: Symbol('advisory'),
    MOUNTAIN_INFORMATION_NETWORK: Symbol('min'),
    MAP: Symbol('map'),
}
const BOUNDS = [
    // northern
    [-140.98, 57.45, -126.41, 63.41],
    // eastern
    [-80.01, 43.06, -50.1, 52.6],
]
const ZOOM = 4.3
const CENTER = [-125.15, 54.8]

// Utils
function counter(count, { size }) {
    return count + size
}
