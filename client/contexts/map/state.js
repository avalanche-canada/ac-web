import React, { createContext, useMemo, useContext } from 'react'
import PropTypes from 'prop-types'
import { useSessionStorage, useSet } from 'hooks'

const MapStateContext = createContext()

Provider.propTypes = {
    children: PropTypes.element.isRequired,
}

export function Provider({ children }) {
    const [errors, addError, removeError, clearErrors] = useSet()
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
            addError,
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
