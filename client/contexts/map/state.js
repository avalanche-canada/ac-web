import React, {
    createContext,
    useMemo,
    useContext,
    useRef,
    useState,
} from 'react'
import PropTypes from 'prop-types'
import { useSessionStorage } from 'hooks'

const MapStateContext = createContext()

Provider.propTypes = {
    children: PropTypes.element.isRequired,
}

export function Provider({ children }) {
    const [zoom, setZoom] = useSessionStorage('zoom', 4.3)
    const [center, setCenter] = useSessionStorage('center', CENTER)
    const errors = useErrors()
    const value = useMemo(
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

    return (
        <MapStateContext.Provider value={value}>
            {children}
        </MapStateContext.Provider>
    )
}

export function useMapState() {
    return useContext(MapStateContext)
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
const CENTER = {
    lng: -125.15,
    lat: 54.8,
}

// Utils
function counter(count, { size }) {
    return count + size
}
