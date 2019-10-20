import React, { createContext, useMemo, useContext } from 'react'
import PropTypes from 'prop-types'
import { useSessionStorage, useArray } from 'hooks'

const MapStateContext = createContext()

// TODO Should not expose that value, but required by the Trip Planner!
export default MapStateContext

Provider.propTypes = {
    children: PropTypes.element.isRequired,
}

export function Provider({ children }) {
    const [errors, pushError, removeError, clearErrors] = useArray()
    const [zoom, setZoom] = useSessionStorage('zoom', 4.3)
    const [center, setCenter] = useSessionStorage('center', {
        lng: -125.15,
        lat: 54.8,
    })
    const value = useMemo(
        () => ({
            zoom,
            setZoom,
            center,
            setCenter,
            errors,
            pushError,
            removeError,
            clearErrors,
        }),
        [zoom, center.lng, center.lat, errors]
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
